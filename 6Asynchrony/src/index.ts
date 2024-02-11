import express, {Request, Response} from 'express';
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "./types";
import {CourseCreateModel} from "./models/Course_Create_Model";
import {CourseUpdateModel} from "./models/Corse_Update_Model";
import {GetCourseQueryModel} from "./models/Get_Courses_Query_Model";
import {CourseViewModel} from "./models/CourseViewModel";
import {URI_Params_id_Model} from "./models/URI_Params_id_Model";

export const app = express()

const port = process.env.PORT||3005;

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}


const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

type CourseType = {
    id: number
    title: string
    studentsCounts: number
}

const db: { courses: CourseType[] } = {
    courses:
        [
            {id: 1, title: 'front-end', studentsCounts: 10},
            {id: 2, title: 'back-end', studentsCounts: 10},
            {id: 3, title: 'automation qa', studentsCounts: 10},
            {id: 4, title: 'devops', studentsCounts: 10}
        ]
}

const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    }
}
app.get('/courses', (req: Request < RequestWithQuery< GetCourseQueryModel > >,
                     res: Response < CourseViewModel[] >) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses
            .filter(c => (c.title.indexOf(req.query.title) <= -1))
    }
    res.json(foundCourses.map(getCourseViewModel))
})

app.get('/courses/:id', (req: RequestWithParams <URI_Params_id_Model>,
                         res )  => {

    const foundCourses = db.courses.find(c => c.id === +req.params.id);

    if (!foundCourses) {
        res.sendStatus(404);
        return;
    }
    res.json( getCourseViewModel(foundCourses))
})
app.post('/courses', (req: RequestWithBody <CourseCreateModel>,
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
app.delete('/courses/:id', (req: RequestWithParams< URI_Params_id_Model >, res) => {

    db.courses = db.courses.filter(c => c.id !== +req.params.id);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
app.put('/courses/:id', (req: RequestWithParamsAndBody<{id:string},CourseUpdateModel>,
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
app.delete('/__test__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})