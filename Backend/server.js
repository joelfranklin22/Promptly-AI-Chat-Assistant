import express from "express";
import cors from "cors";
import db from "./config/database.js";
import registerRoutes from "./routes/authRegister.js";
import loginRoutes from "./routes/authLogin.js";
import cookieParser from "cookie-parser";
import refreshToken from "./utils/refreshToken.js";
import chatRoutes from "./routes/chatRoute.js";

const app = express();  

// Using cors for verifying frontend and backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
// Response will be in json format for that we use .
app.use(express.json());

// For Passing refresh tokens as cookie
app.use(cookieParser());

// Routes for different url
app.use("/api/auth", registerRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/refreshtokens", refreshToken);
app.use("/chat", chatRoutes);

app.listen(4000, () => {
  console.log("Server started Running");
});
