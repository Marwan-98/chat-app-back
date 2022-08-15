import express from "express";

import User from "../entities/User";
import Conversation from "../entities/Conversation";
import Message from "../entities/Message";

const router = express();


router.post("/new", async (req, res) => {
	const {body, userID, receiverID, conversationID} = req.body;

	const sender = await User.findOne({ where: { id: userID } });

	const receiver = await User.findOne({ where: { id: receiverID } });
	
	const conversation = await Conversation.findOne({ where: { id: conversationID }, relations: {messages: {user: true}} });

	if(sender && receiver && conversation) {
		const message = await Message.create({
			body,
			user: sender
		});
		await message.save();

		conversation.messages.push(message)

		await conversation.save();

		return res.json(conversation);
	}
})

export default router