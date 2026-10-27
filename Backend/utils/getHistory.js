import express from "express";
import { verifyTokens } from "../middleware/authMiddleware.js";
import db from "../config/database.js";

const router = express.Router();

router.post("/", verifyTokens, async (req, res) => {
  const user_Id = req.userId;
  console.log("------------------------------");
  console.log(user_Id);
  console.log("------------------------------");

  const [rows] = await db.execute("Select * from chats where user_id=?", [
    user_Id,
  ]);

  res.status(200).json({history: rows });

  console.log(rows);

  res.status(200).json({ msg: "working correct" });
});

export default router;
