export default function Lecture({
    courseName,
    date,
    time,
    room,
}: {
    courseName: string;
    room: string;
    time: string;
    date: string;
}) {
    return (
        <>
            <ul>
                <li>{courseName}</li>
                <li>{date}</li>
                <li>{time}</li>
                <li>{room}</li>
            </ul>
        </>
    );
}
