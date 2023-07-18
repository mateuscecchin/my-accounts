import { parseCookies } from "nookies";

export interface IUser {
	username: string;
	email: string;
}

export type SinginData = {
	username: string;
	email: string;
	password: string;
};

export async function createUser(user: SinginData) {
	const res = await fetch("http://localhost:8081/create-account", {
		method: "post",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(user),
	});
	return await res.json();
}

export type LogInData = {
	email: string;
	password: string;
};

export async function logIn(data: LogInData) {
	const token = await fetch("http://localhost:8081/login", {
		method: "post",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({ email: data.email, password: data.password }),
	});

	const tokenSerialized = await token.json();

	return tokenSerialized.token;
}

export async function fetchUser(userId: number) {
	const { token } = parseCookies();
	const user = await fetch(`http://localhost:8081/user/${userId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const userSerialized = await user.json();

	return userSerialized as IUser;
}
