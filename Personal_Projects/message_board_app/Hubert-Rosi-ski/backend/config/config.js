import { config } from "dotenv";

config();

// Export database and server configuration from environment variables
export default {
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
  },
  server: {
    port: process.env.PORT || 8080,
  },
};