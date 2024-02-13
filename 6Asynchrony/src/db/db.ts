export type CourseType = {
    id: number
    title: string
    studentsCounts: number
}
export const db: DBType = {
    courses:
        [
            {id: 1, title: 'front-end', studentsCounts: 10},
            {id: 2, title: 'back-end', studentsCounts: 10},
            {id: 3, title: 'automation qa', studentsCounts: 10},
            {id: 4, title: 'devops', studentsCounts: 10}
        ]
}

export type DBType = { courses: CourseType[] }

