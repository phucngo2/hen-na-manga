import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function SettingRoute({ component: Component, ...rest }) {
    const user = useSelector((state) => state.user);

    if (!user) {
        return <Redirect to="/" />;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default SettingRoute;
