import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";

export async function authenticateToken(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(
      token,
      PRIVATE_KEY,
      (err: jwt.VerifyErrors | null, user: any) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      }
    );
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while authenticating the token." });
  }
}
