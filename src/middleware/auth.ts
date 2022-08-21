import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.get('auth')!

    if(!token) {
        return res.status(403).send("token not found")
    }
    try {
        let payload;
        payload = jwt.verify(token, process.env.TOKEN_KEY!)
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
    return next();
}

export default auth;

