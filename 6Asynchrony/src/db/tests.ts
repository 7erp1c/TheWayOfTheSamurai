
import express, {Express} from "express";
import {DBType} from "./db";
import {HTTP_STATUSES} from "../utils";


export const getTestRouter = (db: DBType) => {
    const router = express.Router();

    router.delete('/data', (req, res) => {
        db.courses = [];
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    })
    return router;
}