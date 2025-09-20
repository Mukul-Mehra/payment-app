import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: "Authorization token missing" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
export { authMiddleware };
//# sourceMappingURL=middleware.js.map