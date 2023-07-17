import { app } from "../../libs/express";
import { prisma } from "../../libs/prisma";
import cors from "cors";

app.get("/user/:id", cors(), async (req: any, res) => {
  const google_id = req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      google_id,
    },
  });
  res.send(user);
});
