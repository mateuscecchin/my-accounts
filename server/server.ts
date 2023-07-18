import cors from "cors";
// import "./src/routes/user";
// import "./src/routes/accounts";
import { app } from "./src/libs/express";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();
const PRIVATE_KEY = "1010FFF";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
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
};

app.post("/create-account", async (req: Request, res: Response) => {
	const { email, password, username } = req.body;

	const hashedPassword = bcrypt.hashSync(password, 10);

	await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			username,
		},
	});

	res.status(200).send({ message: "User created!" });
});

app.post("/login", async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		return res.status(401).send({ message: "User not finded" });
	}

	const passwordMatch = bcrypt.compareSync(password, user.password);

	if (passwordMatch) {
		const token = jwt.sign(
			{ username: user.username, id: user.id },
			PRIVATE_KEY
		);
		return res.json({ token });
	}

	res.sendStatus(401);
});

app.get(
	"/user/:id",
	authenticateToken,
	async (req: express.Request, res: express.Response) => {
		const userId = req.params.id;

		const user = await prisma.user.findUnique({ where: { id: userId } });

		res.send({
			email: user?.email,
			username: user?.username,
			id: user?.id,
		});
	}
);

app.listen(8081, () => {
	console.log("Server listen in 8081");
});
