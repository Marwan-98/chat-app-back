import express from "express";
import User from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const router = express();

router.post("/add", async (req, res) => {
	try {
	const {firstName, lastName, email, password} = req.body;

	const user = await User.findOne({where: {email: email}});

	const hashPassword = await bcrypt.hash(password, 10);

	if(!user) {
		const newUser = await User.create({
			firstName,
			lastName,
			email,
			password: hashPassword
		})
		await newUser.save()
		const token = jwt.sign(
			{email: newUser.email}, 
			process.env.TOKEN_KEY!, {
        	expiresIn: "1d",
      })
		res.json({
			newUser,
			token
		});
	} else {
			res.status(400).send("user alredy exists")
	}
	} catch(err) {
		res.status(500).json(err);
	}
})

export default router