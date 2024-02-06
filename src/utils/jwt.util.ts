import {Request, Response} from "express";
import jwt from "jsonwebtoken";

class JwtUtil {
    static async middleware(req: Request, res: Response, next: Function) {
        try {
            const token = req.headers["authorization"]?.split(" ")[1]
            if (token) {
                const isVerified = jwt.verify(token, process.env.JWT_SECRET ?? "");
                req.body.requestedBy = isVerified;
                if (isVerified) {
                    next();
                }
            } else {
                return res.status(401).json({
                    ok: false,
                    error: "Token not found or invalid",
                });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static generateToken(payload: any): string {
        return jwt.sign(payload, process.env.JWT_SECRET ?? "");
    }
}

export default JwtUtil;
