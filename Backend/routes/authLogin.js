import express from "express";
import db from "../config/database.js";
import bcrypt from "bcrypt";
import {
  generateAccessTokens,
  generateRefreshTokens,
} from "../utils/generateTokens.js";

const router = express.Router();

router.post("/login", async (req, res) => {

  // email and password from body request
  const { email, password } = req.body;

    //   checking the email and password in db
  try {
    const [rows] = await db.execute(
      "Select id,password from users where email=?",
      [email],
    );
    console.log(rows);

    // if data not exists
    if (rows.length == 0) {
      return res.status(401).json({ msg: "user not exists" });
    } else {

      // if data exists
      try {

        // Compare db password and req body password
        const hashedPassword = rows[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        
        // if pasword macthed
        if (isMatch) {
          // token generation here
          try {
            const accessToken = generateAccessTokens(rows[0].id);
            const refreshToken = generateRefreshTokens(rows[0].id);

            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              sameSite: "strict",
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ accessToken });
          } catch (error) {
            // token error catch throws here
            console.log(error);
            return res.status(401).json({ msg: "token error" });
          }
        }
        // if password doesnt match
        else {
          return res.status(401).json({ msg: "Password not Match" });
        }
      } catch (error) {
        //   if error in password checking throws catch here
        console.log(error);
        return res.status(401).json({ msg: "error in db password checking" });
      }
    }
  } catch (error) {
    //   if error in db throws error here
    console.log(error);
    return res.status(401).json({ msg: "error in db" });
  }
});

export default router;
