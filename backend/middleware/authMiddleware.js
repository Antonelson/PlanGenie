import jwt from "jsonwebtoken";
import "dotenv/config";
export default function authMiddleware(req, res, next) {
  const token = req.signedCookies.jwt;
  if (!token) {
    return res.status(401).send("Access denied. No valid token provided.");
  }
;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).send("Access denied. Invalid token.");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Access denied. Invalid token.");
  }
}
