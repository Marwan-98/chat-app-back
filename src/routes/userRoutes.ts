import express from "express";

const router = express();

router.post("/", (req, res) => {
	res.send("welcome");
})

export default router