import * as zod from "zod";

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
