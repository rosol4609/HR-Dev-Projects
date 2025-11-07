// backend/routes/messages.js
import express from "express";
import auth from "../middleware/auth.js";
import Message from "../models/Message.js";

const router = express.Router();

// GET /messages - get only current user's messages
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { userId: req.user.id },
      order: [["id", "DESC"]],
    });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd pobierania wiadomości" });
  }
});

// POST /messages - create a message for current user
router.post("/", auth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || content.trim().length < 5) return res.status(400).json({ message: "Niepoprawna treść" });

    const message = await Message.create({ content, userId: req.user.id });
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd tworzenia wiadomości" });
  }
});

// PUT /messages/:id - edit only if owner
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const message = await Message.findByPk(id);
    if (!message || message.userId !== req.user.id) return res.status(404).json({ message: "Brak dostępu" });

    message.content = content;
    await message.save();
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd aktualizacji" });
  }
});

// DELETE /messages/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);
    if (!message || message.userId !== req.user.id) return res.status(404).json({ message: "Brak dostępu" });
    await message.destroy();
    res.json({ message: "Usunięto" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd usuwania" });
  }
});

export default router;
