import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

const PRIVATE_KEY = "1010FFF";

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const { email, password, username } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        email,
        password: hashedPassword,
        username,
      } as any);

      res.status(200).send({ message: "User created!" });
    } catch (error) {
      res.status(500).send({ error: "An error occurred while creating the user." });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(401).send({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { username: user.username, id: user.id },
          PRIVATE_KEY
        );
        return res.json({ token });
      }

      res.sendStatus(401);
    } catch (error) {
      res.status(500).send({ error: "An error occurred while logging in." });
    }
    
  }

  static async getUserData(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      res.send({
        email: user.email,
        username: user.username,
        id: user.id,
      });
    } catch (error) {
      res.status(500).send({ error: "An error occurred while fetching user data." });
    }
  }
}