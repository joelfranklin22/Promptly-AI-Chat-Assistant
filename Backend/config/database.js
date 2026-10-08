import sql from "mysql2/promise";

// Codes for connecting with database
const db = await sql.createConnection({
  host: "localhost",
  user: "root",
  password: "2004",
  database: "ai_chatbot_data",
});

export default db;
