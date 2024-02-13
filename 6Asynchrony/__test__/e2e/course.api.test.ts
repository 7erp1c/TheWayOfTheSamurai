import request from 'supertest'
import {CourseCreateModel} from "../../src/models/Course_Create_Model"
import {CourseUpdateModel} from '../../src/models/Course_Update_Model'
import {app} from "../../src/app";
import {HTTP_STATUSES} from "../../src/utils";

const getRequest = () => {
    return request(app)
}
describe('/courses', () => {
    beforeAll(async () => {
        await getRequest().delete('/__test__/data')
    })


    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/courses/1')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`shouldn't create course with incorrect input data`, async () => {
        const data: CourseCreateModel = {title: ''}

        await request(app)
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })
})

let CreatedCourse1: any = null
it(`should create course with correct input data`,async()=>{
    const data: CourseCreateModel = {title: 'it-incubator'}
    const createResponse = await request(app)
        .post('/courses')
        .send(data)
        .expect(HTTP_STATUSES.CREATED_201)
    CreatedCourse1 = createResponse.body;

    expect(CreatedCourse1).toEqual({
        id: expect.any(Number),
        title: 'it-incubator course'
    })

})