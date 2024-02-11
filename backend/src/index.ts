import express from "express";
import bodyParser from "body-parser";
import {
    classPatternSchema,
    lectureVecSchema,
    courseSchema,
    lectureSchema,
} from "./types";
import { courseModel, lectureModel } from "./db";

let jsonParser = bodyParser.json();

const app = express();

//TODO: Return Entire data at this endpoint
app.get("/timetable", (_, res) => {
    res.status(400).json({ "/timetable/{}": "course / date" });
});

app.get(
    "/timetable/course-wise/:coures_name/:lecture_date",
    jsonParser,
    async function (req, res) {
        const courseName = req.params.coures_name;
        const lectureDate = req.params.lecture_date;

        const lectures = await lectureModel.find();

        res.json({
            lectures: lectures.filter(
                (lecture) =>
                    lecture.courseName === courseName &&
                    lecture.date === lectureDate
            ),
        });
    }
);

app.get("/timetable/date-wise/:date", async (req, res) => {
    const lectureDate = req.params.date;

    const lectures = await lectureModel.find();

    res.json({
        lectures: lectures.filter((lecture) => lecture.date === lectureDate),
    });
});

app.post("/timetable/addCourse", jsonParser, async function (req, res) {
    const validatedData = courseSchema.safeParse(req.body);

    if (!validatedData.success) {
        res.status(400).json({
            error: "Invalid body format",
        });
        return;
    }

    const { name: course_name, instructor, batch } = req.body;

    if (!(await courseModel.exists({ _id: course_name }))) {
        res.status(400).json({ ERROR: "Provided course already exists" });
        return;
    }

    await courseModel.create([
        {
            _id: course_name,
            name: course_name,
            instructor,
            batch,
        },
    ]);

    res.json({ OK: "Course has been added" });
});

app.delete(
    "/timetable/deleteCourse/:course_name",
    jsonParser,
    async (req, res) => {
        const course_name = req.params.course_name;

        if (!(await courseModel.exists({ _id: course_name }))) {
            res.status(400).json({ ERROR: "Provided course does not exists" });
            return;
        }

        await courseModel.deleteOne({ _id: course_name });

        res.json({ OK: `Course ${course_name} has been deleted` });
    }
);

app.post("/timetable/addLectures", jsonParser, async function (req, res) {
    const validatedData = lectureVecSchema.safeParse(req.body);

    if (!validatedData.success) {
        res.status(400).json({
            error: "Invalid body format for this endpoint.",
        });
        return;
    }

    const lectures = validatedData.data;

    lectures.lectures.forEach((lecture) => {
        (async function () {
            await lectureModel.create([
                { _id: crypto.randomUUID(), ...lecture },
            ]);
        })();
    });

    res.json({ OK: "Lecture has been added" });
});

app.put("/timetable/updateLecture/:lecture_id", jsonParser, async function (req, res) {
    const lectureId = req.params.lecture_id;
    const validatedData = lectureSchema.safeParse(req.body);

    if (!validatedData.success) {
        res.status(400).json({
            error: "Invalid body format for this endpoint.",
        });
        return;
    }

    const updateData = validatedData.data;

    if (!(await lectureModel.exists({ _id: lectureId }))) {
        res.status(400).json({ ERROR: "Provided Lecture does not exists" });
        return;
    }

    await lectureModel.updateOne({ _id: lectureId }, updateData);

    res.json({ OK: "Lecture successfully updated" });
});

app.delete("/timetable/deleteLecture/:lecture_id", async function (req, res) {
    const lectureId = req.params.lecture_id;

    if (!(await lectureModel.exists({ _id: lectureId }))) {
        res.status(400).json({ ERROR: "Provided Lecture does not exists" });
        return;
    }

    await lectureModel.deleteOne({ _id: lectureId });

    const resObj = {
        res: "Lecture entry deleted successfully",
    };
    res.json(resObj);
});

app.post("/classPattern/:id", jsonParser, function (req, res) {
    // const classId = req.params.id;

    const validatedData = classPatternSchema.safeParse(req.body);
    if (!validatedData.success) {
        res.status(400).json({ error: "Invalid class layout" });
        return;
    }

    const classLayoutParameters = validatedData.data;

    const noOfRows = classLayoutParameters.rows;
    const noOfColumns = classLayoutParameters.columns;

    type Seat = {
        seatNumber: string;
    };

    let layout: Seat[][] = [];

    for (let i = 0; i < noOfRows; i++) {
        const row: Seat[] = [];
        for (let j = 0; j < noOfColumns; j++) {
            const seatNumber = `Seat ${i * noOfColumns + j + 1}`;
            row.push({ seatNumber });
        }
        layout.push(row);
    }

    res.json({ layout });
});

app.listen(4000);
