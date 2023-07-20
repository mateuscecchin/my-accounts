import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = "1010FFF";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, PRIVATE_KEY, (err: jwt.VerifyErrors | null) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while authenticating the token." });
  }
};