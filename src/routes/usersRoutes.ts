import User from "../entities/User";
import express from 'express';

const router = express();

router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (err) {
        return res.status(400).json(err)
    }
})

router.get('/:id', async (req, res) => {
try {

    const user_id = +req.params.id;

    const user = await User.findOne({
        where: { id: user_id }, relations: {
            conversations: { users: true, messages: { user: true } }
        }}

    )

        return res.json(user);

    } catch (error) {
        return res.status(500).json({ message: error });


    };

})

export default router