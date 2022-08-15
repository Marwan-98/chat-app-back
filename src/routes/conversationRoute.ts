import User from "../entities/User";
import express from "express"
import { Raw } from "typeorm";
import Conversation from "../entities/Conversation";

const router = express();

router.post("/all", async (req, res) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({
			where: {
				email: Raw((alias) => `LOWER(${alias}) Like LOWER(:value)`, {
					value: `%${email}%`,
				}),
			},
			relations: {
				conversations: {users: true, messages: {user: true}}
			}
		});

        const conversations = await Conversation.find({
			where: {users: {email: email}},
            relations: {
                users: true,
                messages: {user: true}
			}
		});

		return res.json( conversations )

	} catch (err) {
		res.status(500).json(err);
	}
})

export default router