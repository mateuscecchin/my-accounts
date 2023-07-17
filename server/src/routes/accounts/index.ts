import { Request } from "express";
import { app } from "../../libs/express";
import { prisma } from "../../libs/prisma";
import { Account } from "@prisma/client";
import bodyParser from "body-parser";
import cors from "cors";

app.get("/accounts/:userId", cors(), async (req, res) => {
  const user_id = req.params.userId;
  const accounts = await prisma.account.findMany({
    where: {
      user_id,
    },
  });
  res.send(accounts);
});

app.post(
  "/accounts/create",
  bodyParser.json(),
  async (req: Request<{}, Account>, res) => {
    const data = req.body;
    await prisma.account.create({
      data,
    });
  }
);
