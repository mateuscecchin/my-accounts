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
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
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
	const token = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
		method: "post",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({ email: data.email, password: data.password }),
	});

	const tokenParsed = await token.json();

	return tokenParsed.token;
}

export async function fetchUser() {
	const { token } = parseCookies();
	const user = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const userSerialized = await user.json();

	return userSerialized as IUser;
}
