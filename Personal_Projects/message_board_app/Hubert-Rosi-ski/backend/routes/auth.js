import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email i hasło są wymagane" });
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Użytkownik już istnieje" });
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await User.create({ email, passwordHash });
        const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 1000 * 60 * 60 });
        res.json({ id: newUser.id, email: newUser.email });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Błąd serwera podczas rejestracji" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email i hasło są wymagane" });
        }
        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(401).json({ message: "Nieprawidłowe dane logowania" });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Nieprawidłowe dane logowania" });
        }
        const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 1000 * 60 * 60 });
        res.json({ id: existingUser.id, email: existingUser.email });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Błąd serwera podczas logowania" });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
    res.json({ message: "Wylogowano pomyślnie" });
});

router.get("/me", async (req, res) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Brak tokenu" });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(payload.userId);

    if (!user) {
      return res.status(401).json({ message: "Nie znaleziono użytkownika" });
    }

    res.json({ user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(401).json({ message: "Nieautoryzowany" });
  }
});



export default router;
