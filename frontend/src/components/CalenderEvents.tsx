import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Lecture from "./Lecture";

const fetchLectures = async (date: string) => {
    const res = await fetch(
        "http://localhost:4000/timetable/date-wise/" + date
    );

    return res.json();
};

export default function CalenderEvents() {
    const [dateSelected, setDateSelected] = useState<string>(
        new Date().toISOString().slice(0, 10)
    );

    const lecturesData = useQuery({
        queryFn: () => fetchLectures(dateSelected),
        //cached and fresh for 60 minutes
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        queryKey: [dateSelected],
    });

    return (
        <div className="calender-container">
            <input
                type="date"
                name="date-picker"
                value={dateSelected}
                onChange={(e) => {
                    setDateSelected(e.target.value);
                }}
            ></input>

            <h1>Today's Lectures</h1>
            {JSON.stringify(lecturesData.data)}
            {lecturesData.isSuccess && lecturesData.data.lectures.map((lecture: {_id: string, courseName: string, date: string, time: string, room: string})=> {
                return <Lecture key={lecture._id} {...lecture}/>
            })}
        </div>
    );
}
