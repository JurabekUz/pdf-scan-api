import {Request, Response} from "express";
import {UserSchema} from "../database/user.scema";
import bcrypt from "bcrypt";
import JwtUtil from "../utils/jwt.util";

abstract class AbstractAuthController {
    abstract login(req: Request, res: Response): void;

    abstract getMe(req: Request, res: Response): void;
}

interface LoginReq {
    username: string;
    password: string;
}

class AuthController extends AbstractAuthController {
    async login(req: Request, res: Response) {
        try {
            const reqUser: LoginReq = req.body;
            const currentUser = await UserSchema.findOne(
                {
                    username: reqUser.username,
                },
                {},
                {
                    populate: {
                        path: "file",
                        select: "-is_delete -__v",
                    },
                }
            );
            if (!currentUser) {
                return res.status(404).json({
                    ok: false,
                    message: "User not found",
                });
            }
            const isPasswordCorrect: boolean = await comparePassword(
                reqUser.password,
                currentUser?.password
            );
            if (!isPasswordCorrect) {
                return res.status(401).json({
                    ok: false,
                    message: "Wrong password",
                });
            }
            const token = JwtUtil.generateToken({id: currentUser?._id});
            res.status(200).json({
                ok: true,
                data: currentUser.toJSON(),
                token,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getMe(
        req: Request,
        res: Response
    ) {
        try {
            const myId = (req.body.requestedBy["id"]);
            const currentUser = await UserSchema.findById(myId);
            if (!currentUser) {
                return res.status(404).json({
                    ok: false,
                    message: "User not found",
                });
            }
            res.status(200).json({
                ok: true,
                data: currentUser,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

function comparePassword(
    password: string,
    password1: string | undefined
): boolean | PromiseLike<boolean> {
    try {
        return bcrypt.compareSync(password, password1 ?? "");
    } catch (error) {
        return false;
    }
}

export default new AuthController();
