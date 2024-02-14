import { useQuery } from "@tanstack/react-query";

const fetchCourses  = async () => {
    const res = await fetch("http://localhost:4000/timetable/courses");
    return res.json();
}

export default function Courses() {
    const allCourses = useQuery({
        queryFn: () => fetchCourses(),
        //cached and fresh for 60 minutes
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        queryKey: ["all_courses"],
    });
    return (
        <div className="courses-container">
            <h1>This is courses</h1>
            {JSON.stringify(allCourses.data)}
        </div>
    );
}
