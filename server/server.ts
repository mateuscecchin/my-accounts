import cors from "cors";
import "./src/routes/auth";
import "./src/routes/user";
import "./src/routes/accounts";
import { app } from "./src/libs/express";

app.use(cors());

app.listen(8081, () => {
  console.log("Server listen in 8081");
});
