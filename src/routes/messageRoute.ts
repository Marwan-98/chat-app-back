import express from "express";

import User from "../entities/User";
import ConversationTable from "../entities/Conversation_User"
import Conversation from "../entities/Conversation";
import Message from "../entities/Message";

const router = express();


router.post("/new", async (req, res) => {
	const {body, userID, receiverID, conversationID} = req.body;

	const sender = await User.findOne({ where: { id: userID } });

	const receiver = await User.findOne({ where: { id: receiverID } });

	if(sender && receiver) {
		const conversation = await Conversation.create({});

		const message = await Message.create({
			body,
			user: sender
		});
		await message.save();

		conversation.users = [sender, receiver];
		conversation.messages = [message];

		await conversation.save();

		res.json(conversation);
	}
})

export default router