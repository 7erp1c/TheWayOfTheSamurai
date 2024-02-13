import express, {Request, Response} from "express";
import {CourseViewModel} from "./models/CourseViewModel";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "./types";
import {GetCourseQueryModel} from "./models/Get_Courses_Query_Model";
import {URI_Params_id_Model} from "./models/URI_Params_id_Model";
import {CourseCreateModel} from "./models/Course_Create_Model";
import {CourseUpdateModel} from "./models/Course_Update_Model";
import {getCoursesRouter, HTTP_STATUSES} from "./routes/courses";
import {db} from "./db/db";
import {getTestRouter} from "./db/tests";

export const app = express()
export const jsonBodyMiddleware = express.json()


app.use(jsonBodyMiddleware)

app.use("./courses",getCoursesRouter(db))
app.use("/__test__",getTestRouter(db))


