import express from "express";
import User from "../entities/User"

const router = express();

router.post("/add", async (req, res) => {
	try {
	const {firstName, lastName, email, password} = req.body;

	const user = await User.findOne({where: {email: email}});

	if(!user) {
		const newUser = await User.create({
			firstName,
			lastName,
			email,
			password
		})
		await newUser.save()
		res.json(newUser);
	}
	res.status(400).send("user alredy exists")
	} catch(err) {
		res.status(500).json(err);
	}
})

export default router