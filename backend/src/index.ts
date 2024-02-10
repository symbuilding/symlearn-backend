import express from "express";
import bodyParser from "body-parser";
import {
    timeTableSchema,
    classPatternSchema,
    Course,
    lectureSchema,
    Lecture,
    courseSchema,
    
} from "./types";
import { courseModel, lectureModel} from "./db";
import * as fs from "fs";

let jsonParser = bodyParser.json();

const app = express();

app.get("/timetable", (_, res) => {
    res.status(405).json({ "/timetable/{}": "course / date" });
});

app.get(
    "/timetable/course-wise/:coures_name/:date",
    jsonParser,
    async function (req, res) {
        const courseName = req.params.coures_name;
        const lectureDate = req.params.date;

        const lectures = await lectureModel.find();

        res.json({lectures: lectures.filter(lecture => lecture.courseName === courseName && lecture.date === lectureDate)});
    }
);

app.get("/timetable/date-wise/:date", async (req, res) => {
    const lectureDate = req.params.date;

    const lectures = await lectureModel.find();

    res.json({ lectures: lectures.filter(lecture => lecture.date === lectureDate) });
});

app.post("/timetable/addCourse",jsonParser,async function(req,res){
    const validatedData = courseSchema.safeParse(req.body);

    if(validatedData.success){
        const {name, instructor, batch} = req.body;
        const courseDetails = await courseModel.create([{
            name,
            instructor,
            batch
        }])
    
        res.json({"OK": "Course has been added"});
    }
    else{
        res.status(405).json({
            error: "Invalid body format"
        });
    }
})

app.post("/timetable/addLectures", jsonParser, async function (req, res) {
    const validatedData = lectureSchema.safeParse(req.body);
    if (validatedData.success) {
        const lectures = validatedData.data;

        console.log(lectures.lectures);

        lectures.lectures.forEach(lecture => {
            (async function(){
                await lectureModel.create([{...lecture}]);
            })()
        });

        res.json({"OK": "Lecture has been added"});
    } else {
        res.status(405).json({
            error: "Invalid body format for this endpoint.",
        });
    }
});

app.put("/timetable/:id", jsonParser, function (req, res) {
    const timetableId = req.params.id;
    const updateData = req.body;

    const validatedData = timeTableSchema.safeParse(updateData);

    if (validatedData.success) {
        const updatedQuery = {
            id: timetableId,
            ...validatedData.data,
        };

        console.log("Updated timetable entry:", updatedQuery);

        const resObj = {
            res: "Update successful",
        };
        res.json(resObj);
    } else {
        const resObj = {
            res: "something fucked up ",
        };
        res.status(400).json(resObj);
    }
});

app.delete("/timetable/:id", function (req, res) {
    const timetableId = req.params.id;

    console.log("Deleted timetable entry with id:", timetableId);

    const resObj = {
        res: "Timetable entry deleted successfully",
    };
    res.json(resObj);
});

app.post("/classPattern/:id", jsonParser, function (req, res) {
    const classId = req.params.id;

    const validatedData = classPatternSchema.safeParse(req.body);
    if (validatedData.success) {
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
    } else {
        res.status(400).json({ error: "Invalid class layout" });
    }
});

app.listen(4000);