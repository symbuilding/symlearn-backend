import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Courses from "./components/Courses";

export default function Routing(){
    return (
        <Routes>
            <Route element={<Home/>} path="/" />
            <Route element={<Courses/>} path="/courses" />
        </Routes>
    )
}
