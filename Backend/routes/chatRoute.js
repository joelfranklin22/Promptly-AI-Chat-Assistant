import express from "express";
import axios from "axios";
import db from "../config/database.js";
import { verifyTokens } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyTokens, async (req, res) => {
  const req_msg = req.body.message;
  let chatId;
  console.log("-------------------------------------------------------");

  console.log("req msg from frontend", req.body.message);
  console.log("-------------------------------------------------------");

  const user_id = req.userId;
  console.log("user id", user_id);

  //   Storing user msg in db
  try {
    const [rows] = await db.execute(
      "INSERT INTO chats (users_id,sender_req) VALUE (?,?)",
      [user_id, req_msg],
    );
    chatId = rows.insertId;

    console.log("db inserting rows", rows);
  } catch (error) {
    console.log("error in db inserting", error);
  }

  try {
    const res_n8n = await axios.post(
      "https://4ecc9f0e7db7868ea6e10ba74fa07786.n8n.selfmade.codes/webhook-test/f0280a6d-0238-4ebc-bba9-2d3be4db6a71",
      {
        message: req_msg,
      },
    );
    console.log(res_n8n.data);

    console.log(res_n8n.data.message);
    res.status(200).json({ response_message: res_n8n.data.message });

    // Inserting response data into db
    try {
      const [res_db] = await db.execute(
        "Update chats set sender_res=? where id=? AND users_id=?",
        [res_n8n.data.message, chatId, user_id],
      );
      console.log(res_db);
    } catch (error) {
      console.log("error in db while inserting resposne data", error);
    }
  } catch (error) {
    console.log("error while connected", error);
  }

  console.log(req_msg);
});

export default router;
