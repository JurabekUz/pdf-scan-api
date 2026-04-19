import {Request, Response} from "express";
import mongoose from "mongoose";
import {UserSchema} from "../database/user.scema";
import {UserRoles} from "../models/user.model";
import bcrypt from "bcryptjs";

abstract class AbstractUserController {
    abstract getUsers(req: Request, res: Response): void;

    abstract getUser(req: Request, res: Response): void;

    abstract createUser(req: Request, res: Response): void;

    abstract updateUser(req: Request, res: Response): void;

    abstract deleteUser(req: Request, res: Response): void;
}

class UserController extends AbstractUserController {
    async getUsers(req: Request, res: Response) {
        try {
            const users = await UserSchema.find(
                {is_delete: false},
                {password: 0} // means exclude passwordHash field
            );
            res.status(200).json({
                ok: true,
                totalElements: users.length,
                data: users,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const user = await UserSchema.findById(req.params.id, {password: 0});
            res.status(200).json({
                ok: true,
                data: user,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            let role = req.body.role;
            if (typeof role === "string") {
                role = (UserRoles as any)[role];
            }

            // Explicitly cast file ID if present
            const userData = {
                ...req.body,
                role: role,
            };

            if (req.body.file && mongoose.Types.ObjectId.isValid(req.body.file)) {
                userData.file = new mongoose.Types.ObjectId(req.body.file);
            }

            const user = await UserSchema.create(userData);
            res.status(201).json({
                ok: true,
                data: user,
            });
        } catch (error: any) {
            console.error("User Create Error:", error);
            res.status(400).json({
                ok: false,
                message: error.message || error,
            });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            if (req.body.role !== undefined) {
                let role = req.body.role;
                if (typeof role === "string") {
                    role = (UserRoles as any)[role];
                }
                req.body.role = role;
            }

            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const user = await UserSchema.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            res.status(200).json({
                ok: true,
                data: user,
            });
        } catch (error: any) {
            res.status(500).json({
                ok: false,
                message: error.message || error,
            });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const user = await UserSchema.findByIdAndUpdate(
                req.params.id,
                {is_delete: true},
                {new: true}
            );
            res.status(200).json({
                ok: true,
                data: user,
            });
        } catch (error: any) {
            res.status(500).json({
                ok: false,
                message: error.message || error,
            });
        }
    }

    async checkRole(req: Request, res: Response, next: Function) {
        try {
            const userId = req.body.requestedBy.id;
            const user = await UserSchema.findById(userId);
            if (user?.role == UserRoles.DIRECTOR || user?.role == UserRoles.ADMIN) {
                next();
            } else {
                res.status(403).json({
                    ok: false,
                    message: "You don't have permission to do this action",
                });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new UserController();
