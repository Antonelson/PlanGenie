import jwt from "jsonwebtoken";
import "dotenv/config";
export default function authMiddleware(req, res, next) {
  const token = req.signedCookies.jwt;
  if (!token) {
    return res.status(401).json({message:"Access denied. Invalid token."});
  }
;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({message:"Access denied. Invalid token."});
    req.user = decoded;
    // console.log(req.user)
    next();
  } catch (err) {
    return res.status(401).json({message:"Access denied. Invalid token."});
  }
}
