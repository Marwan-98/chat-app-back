import express from "express";
import User from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Raw } from "typeorm";


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
router.get("/login", async (req, res) => {
	try {
	const {email, password} = req.body;

	const user = await User.findOne({
		where: {
		  email: Raw((alias) => `LOWER(${alias}) Like LOWER(:value)`, {
			value: `%${email}%`,
		  }),
		},
	  });
  


	if(!user) {
		res.status(400).json({message:"User Not Found"})
      }
		const correctPass= await bcrypt.compare(password,user?.password!)
if(!correctPass){
	res.status(400).json({message:"incorrect Password"})

}

const token=jwt.sign({email:user?.email}, process.env.TOKEN_KEY!,{
	expiresIn: '1d'
});
res.json({data:token})

	} catch(err) {
		res.status(500).json(err);
	}
})

export default router