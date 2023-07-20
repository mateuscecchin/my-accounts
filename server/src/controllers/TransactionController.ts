import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";

export class TransactionController {
  static async getTransactions(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const transactions = await Transaction.getByUserId(user_id);
      res.send(transactions);
    } catch (error) {
      res.status(500).send({ error: "An error occurred while fetching user transactions." });
    }
  }

  static async createTransaction(req: Request, res: Response) {
    try {
      const data = req.body;
      await Transaction.create(data);
      res.status(200).send({ message: "Transaction created!" });
    } catch (error) {
      res.status(500).send({ error: "An error occurred while creating the transaction." });
    }
  }
}