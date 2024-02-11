import mongoose from "mongoose";

mongoose.connect(
    "mongodb+srv://symlearn:Jme5HndPijSJJvVz@cluster0.v4fg9e1.mongodb.net/?retryWrites=true&w=majority"
);

const lecturesVecSchema = new mongoose.Schema({
    _id: String,
    date: {
        type: String,
        required: true,
        validate: {
            validator: (val: string) => val.length === 8,
            message: "Date must be 8 characters long",
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

export const courseModel = mongoose.model("courseSchema", courseScheme);

export const lectureModel = mongoose.model("lectureSchema", lecturesVecSchema);
