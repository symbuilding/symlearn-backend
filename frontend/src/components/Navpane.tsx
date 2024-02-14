import { NavLink } from "react-router-dom"

export default function Navpane() {
    return (
        <div className="navpane-container">
            <h1>Symlearn</h1>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/courses"}>Courses</NavLink>
        </div>
    );
}
