import jwt from "jsonwebtoken";

export const verifyTokens = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "No tokens Provided" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "No tokens" });

  jwt.verify(token, "Happy", (err, decoded) => {
    if (err) return res.status(401).json({ msg: "invalid token" });
    console.log("decoded value", decoded.userId);

    req.userId = decoded.userId;
    next();
  });
};
