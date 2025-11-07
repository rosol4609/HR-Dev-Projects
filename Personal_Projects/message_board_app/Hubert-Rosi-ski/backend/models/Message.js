import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";
import User from "./User.js";

const Message = sequelize.define("Message", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

User.hasMany(Message, { foreignKey: "userId", onDelete: "CASCADE" });
Message.belongsTo(User, { foreignKey: "userId" });

export { Message };