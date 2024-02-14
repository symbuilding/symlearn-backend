import Routing from "./Routing";
import CalenderEvents from "./components/CalenderEvents";
import Navpane from "./components/Navpane";

export default function App() {
    return (
        <>
            <div id="app-container">
                <Navpane />
                <Routing />
                <CalenderEvents />
            </div>
        </>
    );
}
