import express from "express";
import bodyParser from "body-parser";
import { timeTableSchema, classPatternSchema } from "./types";

let jsonParser = bodyParser.json();

const app = express();

app.get("/timetable", (_, res) => {
    res.status(405).json({ "/timetable/{}": "course / date" });
});

app.get(
    "/timetable/course-wise/:coures_name/:date",
    jsonParser,
    function (req, res) {
        console.log(req.params.coures_name, req.params.date);

        const validatedData = timeTableSchema.safeParse(req.body);

        if (validatedData.success) {
            console.log(validatedData.data);
            const resObj = {
                res: "hi",
            };
            res.json(resObj);
        } else {
            const resObj = {
                res: "nono. Bad request",
            };
            res.json(resObj);
        }
    }
);

// TODO:
// app.get("/timetable/date-wise/:date", (req, res) => {});

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
