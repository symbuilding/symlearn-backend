import * as zod from "zod";
// import { time } from "console";

export type Lecture = {
    lid: number;
    date: string;
    room: string;
    time: string;
};

export type Course = {
    name: string;
    instructor: string;
    batch: string;
    lectures: Lecture[];
};

export type TimeTable = {
    courses: Course[];
};

export const lectureSchema = zod.object({
    date: zod.string().refine((val) => val.length === 8),
    room: zod.string(),
    time: zod.string(),
    courseName: zod.string(),
});

export const lectureVecSchema = zod.object({
    lectures: zod.array(
        zod.object({
            date: zod.string().refine((val) => val.length === 8),
            room: zod.string(),
            time: zod.string(),
            courseName: zod.string(),
        })
    ),
});

export const courseSchema = zod.object({
    name: zod.string(),
    instructor: zod.string(),
    batch: zod.string(),
});

export const classPatternSchema = zod.object({
    rows: zod.number().min(1).max(10),
    columns: zod.number().min(1).max(10),
});

export const quizSchema = zod.object({
    courseName: zod.string(),
    time: zod.string(),
    date: zod.string(),
    quiz: zod.array(
        zod.object({
            question: zod.string(),
            options: zod.array(zod.string()),
            answer: zod.string(),
        })
    ),
});
