import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const comparePasswords = (password: String | Buffer, hash: String) => {
	return bcrypt.compare(password, hash);
};

export const hashPassword = (password: String | Buffer) => {
	return bcrypt.hash(password, 5);
};

export const createJWT = (user: User) => {
	const token = jwt.sign(
		{
			id: user.id,
			name: user.name,
		},
		process.env.JWT_SECRET
	);

	return token;
};

export const protect = (req, res, next) => {
	const bearer: String = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: "not Authorized" });
        return;
	}

    const token = bearer.split(' ')[1];

    if(!token)
    {
        res.status(401);
        res.json({message: "Token invalid"});
        return;
    }

    try{
        //@ts-ignore
        const user = jwt.verify(token,process.env.JWT_SECRET);
        req.user = user;

        next()
    } catch(e) {
        res.status(401);
        res.json({message: "Token invalid"});
        return
    }
};
