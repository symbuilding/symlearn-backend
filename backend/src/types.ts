import * as zod from "zod";
// import { time } from "console";

export const timeTableSchema = zod.object({
    courses: zod.array(
        zod.object({
            name: zod.string(),
            instructor: zod.string(),
            batch: zod.string(),
            lectures: zod.array(
                zod.object({
                    date: zod.string().refine((val) => val.length === 8),
                    room: zod.string(),
                    time: zod.string(),
                })
            ),
        })
    ),
});

export const classPatternSchema = zod.object({
    rows: zod.number().min(1).max(10),
    columns: zod.number().min(1).max(10),
});
