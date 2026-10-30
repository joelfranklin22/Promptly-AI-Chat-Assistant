import express from "express";
import { verifyTokens } from "../middleware/authMiddleware.js";
import db from "../config/database.js";

const router = express.Router();

router.post("/", verifyTokens, async (req, res) => {
  const user_Id = req.userId;
  const filter = req.query.filter;

  //   console.log("printing all contents from request body", req);

  if (filter === "all") {
    console.log("inside if");

    try {
      const [rows] = await db.execute(
        "Select * from chats where user_id=? Order by created_at DESC",
        [user_Id],
      );

      res.status(200).json({ history: rows });

      console.log(rows);
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  } else if (filter === "today") {
    console.log("inside else");

    try {
      const [rows] = await db.execute(
        `SELECT * FROM chats WHERE user_id = ? AND created_at >= CURDATE()
        AND created_at < CURDATE() + INTERVAL 1 DAY ORDER BY created_at ASC`,
        [user_Id],
      );
      console.log(rows);

      res.status(200).json({ history: rows });
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  console.log("user id prints in get history js file  -->", user_Id);
  console.log("query in get history  -->", filter);

  //   res.status(200).json({ msg: "working correct" });
});

export default router;
