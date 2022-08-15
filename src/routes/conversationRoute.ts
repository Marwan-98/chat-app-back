import User from "../entities/User";
import express from "express"
import { In, Raw } from "typeorm";
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

		return res.json( user.conversations )

	} catch (err) {
		res.status(500).json(err);
	}
})


router.post('/newConv', async (req, res) => {

    try {
        const { senderId, userId } = req.body
        const user = await User.findOne({ where: { id: userId } });
        const sender = await User.findOne({ where: { id: senderId } });
        if (user && sender) {
            const conversation = Conversation.create({ users: [] })
            conversation.users.push(user, sender);
            await conversation.save()

            return res.json(conversation)
        }


    } catch (err) {
        console.log(err)
    }
})


export default router