import express from "express";
import { body, param } from "express-validator";
import { getAllMessages, createMessage, updateMessage, deleteMessage } from "../controllers/messageController.js";
import { validate } from "../middleware/validation.js";
import { messageValidationRules } from "../validation/validationRules.js";

const router = express.Router();

// Get all messages
router.get("/", getAllMessages);

// Create a new message with validation
router.post(
  "/",
  [
    body("content")
      .notEmpty()
      .withMessage(messageValidationRules.content.messages.required)
      .isLength({ min: messageValidationRules.content.minLength })
      .withMessage(messageValidationRules.content.messages.tooShort)
      .isLength({ max: messageValidationRules.content.maxLength })
      .withMessage(messageValidationRules.content.messages.tooLong),
  ],
  validate,
  createMessage
);

// Update a message by ID with validation
router.put(
  "/:id",
  [
    param("id").isInt().withMessage(messageValidationRules.id.mustBeInteger),
    body("content")
      .notEmpty()
      .withMessage(messageValidationRules.content.messages.required)
      .isLength({ min: messageValidationRules.content.minLength })
      .withMessage(messageValidationRules.content.messages.tooShort)
      .isLength({ max: messageValidationRules.content.maxLength })
      .withMessage(messageValidationRules.content.messages.tooLong),
  ],
  validate,
  updateMessage
);

// Delete a message by ID with validation
router.delete(
  "/:id",
  [param("id").isInt().withMessage(messageValidationRules.id.mustBeInteger)],
  validate,
  deleteMessage
);

export default router;