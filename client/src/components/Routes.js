// Libs
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
// Component
import AuthRoute from "./account/AuthRoute";
import Login from "./account/Login";
import Register from "./account/Register";
import ForgotPassword from "./account/ForgotPassword";
import RecoverPassword from "./account/RecoverPassword";
import Detail from "./detail/Detail";
import Home from "./home/Home";
import Nav from "./nav/Nav";
import Search from "./search/Search";
import Setting from "./setting/Setting";
import Admin from "./admin/Admin";
import SettingRoute from "./setting/SettingRoute";
import AdminRoute from "./admin/AdminRoute";
import Random from "./random/Random";

const Routes = () => {
    return (
        <Router>
            <div style={{ width: "100vw" }}>
                <Nav />

                {/* Choose pages to render */}
                <Switch>
                    {/* Home Page */}
                    <Route path="/" exact>
                        <Home />
                    </Route>

                    {/* Manga Detail Page */}
                    <Route path="/g">
                        <Detail />
                    </Route>

                    {/* Search Page */}
                    <Route path="/search">
                        <Search />
                    </Route>

                    {/* Login Page */}
                    <AuthRoute path="/login">
                        <Login />
                    </AuthRoute>

                    {/* Register Page */}
                    <AuthRoute path="/register">
                        <Register />
                    </AuthRoute>

                    {/* Forgot Password Page */}
                    <AuthRoute path="/forgot">
                        <ForgotPassword />
                    </AuthRoute>

                    {/* Forgot Password Page */}
                    <AuthRoute path="/recover/:token">
                        <RecoverPassword />
                    </AuthRoute>

                    {/* Setting Pages */}
                    <SettingRoute path="/setting">
                        <Setting />
                    </SettingRoute>

                    {/* Admin Pages */}
                    <AdminRoute path="/admin">
                        <Admin />
                    </AdminRoute>

                    <Route path="/random">
                        <Random />
                    </Route>

                    {/* Error Pages */}
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default Routes;
