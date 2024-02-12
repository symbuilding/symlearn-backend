
# hackathon-170224

[InnovateYou](https://innovateyou.in)

Edutech - LMS

##### Tech

ExpressJS & ReactJS
Data in CSV / JSON

##### API

/timetable/{} - course-wise/{course-name}?date='yyyymmdd' - date-wise/{date}

##### Features

[ ] - Time Table
[ ] - Attendance Manager
[ ] - Course Management
[ ] - In-App Tests (quizes etc)
[ ] - Grade Record
[ ] - Mind Map (eg. per chapter, course)
[ ] - Seating Arrangement

##### Data Format

###### Time Table

```json
{
    "courses": [
        "course": {

            "name": "string",
            "instructor": "string",
            "batch": "string",
            "lectures": [
                {
                    "date": "",
                    "room": "string",
                    "time": ""
}
]

}
]
}
```
