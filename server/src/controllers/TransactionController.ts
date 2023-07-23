import { Response } from "express";
import { Transaction } from "../models/Transaction";

const transaction = new Transaction();

export class TransactionController {
  async getTransactions(req: any, res: Response) {
    try {
      const { id } = req.user;
      const transactions = await transaction.getByUserId(id);
      res.send(transactions);
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred while fetching user transactions." });
    }
  }

  async createTransaction(req: any, res: Response) {
    try {
      const { id } = req.user;
      const body = req.body;
      await transaction.create({ userId: id, ...body });
      res.status(200).send({ message: "Transaction created!" });
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred while creating the transaction." });
    }
  }

  async getTransactionsSummary(req: any, res: Response) {
    try {
      const { id } = req.user;
      const transactions = await transaction.getByUserId(id);

      const payment = transactions
        .filter((transaction) => transaction.type == "payment")
        .reduce((accumulator, current) => current.amount + accumulator, 0);
      const receiment = transactions
        .filter((transaction) => transaction.type == "receiment")
        .reduce((accumulator, current) => current.amount + accumulator, 0);

      const total = receiment - payment;
      const data = { total, payment, receiment };
      res.send(data);
    } catch (err) {
      res
        .status(500)
        .send({ error: "An error ocurred while fetching the transaction." });
    }
  }

  async deleteTransaction(req: any, res: Response) {
    try {
      const { id } = req.params;
      await transaction.delete(id);
      res.send({ message: "Transaction deleted!" });
    } catch (err) {
      res
        .status(500)
        .send({ error: "An error ocurred while delete the transaction." });
    }
  }
}
