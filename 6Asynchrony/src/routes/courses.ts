import express, {Express, Request, Response} from "express";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../types";
import {GetCourseQueryModel} from "../models/Get_Courses_Query_Model";
import {CourseViewModel} from "../models/CourseViewModel";
import {URI_Params_id_Model} from "../models/URI_Params_id_Model";
import {CourseCreateModel} from "../models/Course_Create_Model";
import {CourseUpdateModel} from "../models/Course_Update_Model";
import {CourseType, DBType} from "../db/db";
import {HTTP_STATUSES} from "../utils";



export const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    }
}


export const getCoursesRouter = (db: DBType) => {
     const router = express.Router();
    router.get('/', (req: Request < RequestWithQuery< GetCourseQueryModel > >,
                                   res: Response < CourseViewModel[] >) => {
        let foundCourses = db.courses;
        if (req.query.title) {
            foundCourses = foundCourses
                .filter(c => (c.title.indexOf(req.query.title) < -1))
        }
        res.json(foundCourses.map(getCourseViewModel))
    })
    router.get('/:id', (req: RequestWithParams <URI_Params_id_Model>,
                                       res )  => {

        const foundCourses = db.courses.find(c => c.id === +req.params.id);

        if (!foundCourses) {
            res.sendStatus(404);
            return;
        }
        res.json( getCourseViewModel(foundCourses))
    })
    router.post('/', (req: RequestWithBody <CourseCreateModel>,
                                    res: Response < CourseViewModel > ) => {
        if (!req.body.title) {
            res.sendStatus(400)
            return;
        }

        const createdCourse: CourseType = {
            id: +(new Date()),
            title: 'unknown',
            studentsCounts: 0
        }
        db.courses.push(createdCourse)
        res.status(201)
            .json(createdCourse)
    })
    router.delete('/:id', (req: RequestWithParams< URI_Params_id_Model >, res) => {

        db.courses = db.courses.filter(c => c.id !== +req.params.id);

        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })
    router.put('/:id', (req: RequestWithParamsAndBody<{id:string},CourseUpdateModel>,
                                       res) => {
        if(!req.body.title){
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            return;
        }
        const foundCourse = db.courses.find(c => c.id === +req.params.id);

        if (!foundCourse) {
            res.sendStatus(404);
            return;
        }
        foundCourse.title = req.body.title;


        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })
    return router;
}

export { HTTP_STATUSES };
