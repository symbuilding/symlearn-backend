import mongoose from "mongoose";
import { env } from "process";


mongoose.connect(
    env.symlearn_mongo as string

);

const lecturesVecSchema = new mongoose.Schema({
    _id: String,
    date: {
        type: String,
        required: true,
        validate: {
            validator: (val: string) => val.length === 10,
            message: "Date must be 10 characters long",
        },
    },
    room: { type: String, required: true },
    courseName: { type: String, required: true },
    time: { type: String, required: true },
});

const courseScheme = new mongoose.Schema({
    _id: String,
    name: { type: String, unique: true },
    instructor: String,
    batch: String,
});

export const courseModel = mongoose.model("courseDocument", courseScheme);

export const lectureModel = mongoose.model(
    "lectureDocument",
    lecturesVecSchema
);

export const quizModel = mongoose.model(
    "quizDocument",
    new mongoose.Schema({
        _id: String,
        courseName: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        quiz: [
            {
                question: {
                    type: String,
                    required: true,
                },
                options: {
                    type: [String],
                    required: true,
                },
                answer: {
                    type: String,
                    required: true,
                },
            },
        ],
    })
);
