import e, {Request, Response} from "express";
import {DocumentSchema} from "../database/document.scema";
import {UserSchema} from "../database/user.scema";
import {CategorySchema} from "../database/category.scema";
import {ScopeSchema} from "../database/scope.scema";

abstract class AbstractStatsController {
    abstract getByUser(req: Request, res: Response): void;

    abstract getByType(req: Request, res: Response): void;

    abstract getByTime(req: Request, res: Response): void;


}

class StatsController extends AbstractStatsController {


    async getByUser(_req: e.Request, res: e.Response): Promise<void> {
        try {
            const allDocuments = await DocumentSchema.find();
            const documents = await DocumentSchema.aggregate([
                {
                    $group: {
                        _id: "$by",
                        count: {$sum: 1},
                    }
                },
            ]);
            const users = await UserSchema.populate(documents, {
                path: "_id",
                select: "name",
            });
            res.status(200).json({
                ok: true,
                data: users,
                totalElements: allDocuments.length,
            });
        } catch (e) {
            res.status(500).json({
                ok: false,
                message: e,
            });

        }
    }

    async getByType(_req: e.Request, res: e.Response): Promise<void> {
        try {
            const allDocuments = await DocumentSchema.find();
            const documents = await DocumentSchema.aggregate([
                {
                    $group: {
                        _id: "$type",
                        count: {$sum: 1},
                    }
                },
            ]);
            const categories = await CategorySchema.populate(documents, {
                path: "_id",
                select: "name",
            });
            res.status(200).json({
                ok: true,
                data: categories,
                totalElements: allDocuments.length,
            });
        } catch (e) {
            res.status(500).json({
                ok: false,
                message: e,
            });

        }
    }

    async getByTime(_req: e.Request, _res: e.Response): Promise<void> {
    }


    async getByScope(_req: e.Request, res: e.Response): Promise<void> {
        try {
            const allDocuments = await DocumentSchema.find();
            const documents = await DocumentSchema.aggregate([
                {
                    $group: {
                        _id: "$scope",
                        count: {$sum: 1},
                    }
                },
            ]);
            const scopes = await ScopeSchema.populate(documents, {
                path: "_id",
                select: "name",
            });
            res.status(200).json({
                ok: true,
                data: scopes,
                totalElements: allDocuments.length,
            });
        } catch (e) {
            res.status(500).json({
                ok: false,
                message: e,
            });

        }
    }

}

export default new StatsController();