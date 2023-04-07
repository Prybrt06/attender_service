import Router, { Response } from "express";
import { handleInputErrors } from "./modules/middleware";
import prisma from "./db";

export const router = Router();

router.get("/", handleInputErrors, async (req, res: Response, next) => {
	const subjects = await prisma.subject.findMany({
		where: {
			//@ts-ignore
			userId: req.user.id,
		},
	});

	res.status(201);
	res.json({ subjects: subjects });
});

router.post("/", handleInputErrors, async (req, res) => {
	//@ts-ignore
	// console.log(req);
	const subject = await prisma.subject.create({
		//@ts-ignore
		data: {
			subjectName: req.body.subjectName,
			subjectCode: req.body.subjectCode,
			totalClasses: req.body.totalClasses,
			attendedClasses: req.body.attendedClasses,
			// @ts-ignore
			userId: req.user.id.toString(),
		},
	});

	res.status(201);
	res.json({ subject: subject });
});

router.put("/:subjectId", handleInputErrors, async (req, res, next) => {
	const subId = await req.params.subjectId;
	const subject = await prisma.subject.update({
		where: {
			//@ts-ignore
			id: subId,
		},
        data: {
			totalClasses: req.body.totalClasses,
			attendedClasses: req.body.attendedClasses,
		},
	});

	res.status(201);
	res.json({
		subject: subject,
	});
});

router.delete(
	"/:subjectId",
	handleInputErrors,
	async (req, res, next) => {
		const subject = await prisma.subject.delete({
			where: {
				//@ts-ignore
				id: req.params.subjectId,
			},
		});
		res.status(201);
		res.json({ subject: subject })
	}
);
