import express from "express";
import db from "../config/database.js";
import bcyrpt from "bcrypt";
import {
  generateAccessTokens,
  generateRefreshTokens,
} from "../utils/generateTokens.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  try {
    // Searching for user in db
    const [existingRows] = await db.execute(
      "Select * from users where email=?",
      [email],
    );

    //user already exists so returns the user already exists msg
    if (existingRows.length > 0) {
      return res.status(409).json({ msg: "User Already Exists" });
    }
    // user not exits in db so create new user
    else {
      // Hashing password
      const hashedPassword = await bcyrpt.hash(password, 10);

      // Inserting into db name,email,hashed password
      const [rows] = await db.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
      );
      try {
        const accessToken = generateAccessTokens(rows.insertId);
        console.log(rows);
        console.log(rows.insertId);

        const refreshToken = generateRefreshTokens(rows.insertId);

        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);

        // sending refreshToken via cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        // sending accessToken
        res.status(200).json({
          msg: "Rows Added",
          accessToken,
        });
      } catch (error) {
        console.log(error);

        return res.status(500).json({ msg: "Server Error" });
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: `${error} in catch block` });
  }
});

export default router;
