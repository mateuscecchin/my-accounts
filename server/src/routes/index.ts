import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateToken } from "../middlewares/authentication";
import { TransactionController } from "../controllers/TransactionController";

const transaction = new TransactionController();
const user = new UserController();

const router = Router();

router.post("/user", user.create);
router.post("/login", user.login);

router.use(authenticateToken);

router.get("/user", user.getUserData);
router.get("/transactions", transaction.getTransactions);
router.post("/transactions", transaction.createTransaction);
router.delete("/transactions/:id", transaction.deleteTransaction);
router.get("/transactions/summary", transaction.getTransactionsSummary);

export default router;
