import jwt from "jsonwebtoken";
import User from "./models/user.js";

const JWT_SECRET = process.env.JWT_SECRET

export default async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
        return res.status(401).json({ message: "Brak tokena autoryzacji" });
    }
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(payload.userId);
    if (!user) {
        return res.status(401).json({ message: "Nieprawidłowy token autoryzacji" });
    }
    req.user =  { id: user.id, email: user.email };
    next();
    } catch (error) {
        console.log("Auth Middleware Error:", error);
        return res.status(401).json({ message: "Błąd autoryzacji" });
    }
}