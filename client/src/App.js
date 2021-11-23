// Libs
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// Routes
import Routes from "./components/Routes";

function App() {
    const isDarkMode = useSelector((state) => state.isDarkMode);

    return (
        <div className={isDarkMode ? "App" : "App white"}>
            <Routes />
        </div>
    );
}

export default App;
