import { Message } from "../models/Message.js";

// Get all messages from the database
export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// Create a new message
export const createMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    const message = await Message.create({ content });
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

// Update an existing message
export const updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updated = await Message.update({ content }, { where: { id } });
    if (updated[0] === 0) {
      return res.status(404).json({ success: false, message: "Message not found." });
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

// Delete a message by ID
export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Message.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Message not found." });
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};