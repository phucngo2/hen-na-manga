// Libs
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import jwtDecode from "jwt-decode";
// Routes
import Routes from "./components/Routes";
import { useMutation } from "@apollo/client";
import { FIRST_LOGIN } from "./utils/graphql/auth";
import { useEffect, useState } from "react";
import { login } from "./redux/actions";

function App() {
    const isDarkMode = useSelector((state) => state.isDarkMode);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const [firstLogin] = useMutation(FIRST_LOGIN);

    useEffect(() => {
        (async function () {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                return setLoading(false);
            }

            const decodedToken = jwtDecode(token);

            // Token expired
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem("jwtToken");
                return setLoading(false);
            }

            try {
                const res = await firstLogin();
                dispatch(login(res.data.firstLogin));
            } catch {
                localStorage.removeItem("jwtToken");
            }

            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <div
                className={isDarkMode ? "App" : "App white"}
                style={{ minHeight: "100vh" }}
            ></div>
        );
    }

    return (
        <div className={isDarkMode ? "App" : "App white"}>
            <Routes />
        </div>
    );
}

export default App;
