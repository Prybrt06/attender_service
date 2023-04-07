import prisma from "../db";
import { comparePasswords, createJWT } from "../modules/auth";

export const singin = async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: {
			//@ts-ignore
			userName: req.body.userName,
		},
	});

	const isValid = await comparePasswords(req.body.password, user.password);

	if (!isValid) {
		res.status(401);
		res.json({ message: "Invalid Password" });
		return;
	}

	//@ts-ignore
	const token = createJWT(user);
	res.status(201);
	res.json({ message: "Login successfully", user: user, token: token });
};
