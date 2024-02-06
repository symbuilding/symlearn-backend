import express from "express";
import bodyParser from "body-parser";
import { timeTableSchema } from "./types";

let jsonParser = bodyParser.json();

const app = express();

app.get("/timetable", (req, res) => {
    res.json({ "/timetable/{}": "course / date" });
});

app.post("/timetable", jsonParser, function (req, res) {
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
});

app.get("/timetable/");

app.listen(4000);
