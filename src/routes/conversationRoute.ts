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
				conversations: {users: true, messages: {user: true, conversationID: true}}
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


router.get("/:conv_id", async (req, res) => {
    try {
        const conv_id = +req.params.conv_id;

		const conversation = await Conversation.findOne({ where: { id: conv_id }, relations: {messages: {user: true}}});

      
        if (!conversation)
            return res.status(404).json({ message: " conversation not found  " });



			
        return res.json(conversation.messages);




    } catch (error) {
        return res.status(500).json({ message: error });


    };

})



export default router