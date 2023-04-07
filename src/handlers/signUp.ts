import prisma from "../db";
import { createJWT, hashPassword } from "../modules/auth";

export const createUser = async (req, res) => {
	console.log("Hello\n\n");
	console.log(req.body.password)
	const user = await prisma.user.create({
		data: {
			name: req.body.name,
			scholarId: req.body.scholarId,
			userName: req.body.userName,
			password: await hashPassword(req.body.password),
		},
	});

	const token = createJWT(user);
	res.status(201);
	res.json({ user: user, token: token });
};
