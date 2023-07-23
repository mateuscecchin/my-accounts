import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";

const user = new User();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const { email, password, username } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      await user.create({
        email,
        password: hashedPassword,
        username,
      } as any);

      res.status(200).send({ message: "User created!" });
    } catch (error) {
      console.log("error", error)
      res
        .status(500)
        .send({ error: "An error occurred while creating the user." });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userFinded = await user.findByEmail(email);

      if (!userFinded) {
        return res.status(401).send({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, userFinded.password);

      if (passwordMatch) {
        const token = jwt.sign(
          userFinded,
          PRIVATE_KEY
        );
        return res.json({ token });
      }

      res.sendStatus(401);
    } catch (error) {
      res.status(500).send({ error: "An error occurred while logging in." });
    }
  }

  async getUserData(req: any, res: Response) {
    try {
      const { id } = req.user;
      const userFinded = await user.findById(id);

      if (!userFinded) {
        return res.status(404).send({ message: "User not found" });
      }

      res.send({
        email: userFinded.email,
        username: userFinded.username,
        id: userFinded.id,
      });
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred while fetching user data." });
    }
  }
}
