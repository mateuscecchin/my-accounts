import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateToken } from "../middlewares/authentication";
import { TransactionController } from "../controllers/TransactionController";

const router = Router();

router.post("/create-account", UserController.create);
router.post("/login", UserController.login);

router.use(authenticateToken);

router.get("/user/:id", UserController.getUserData);
router.get("/transactions/:user_id", TransactionController.getTransactions);
router.post("/transactions", TransactionController.createTransaction);

export default router;