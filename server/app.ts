import express, { Express } from "express";
import cors from "cors";
import routes from "./src/routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("/", routes);

export default app;