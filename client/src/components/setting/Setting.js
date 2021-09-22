// Libs
import React, { useState } from "react";

import SettingNav from "./SettingNav";
import "./Setting.css";
import Profile from "./Profile";
import Password from "./Password";
import Favorite from "./Favorite";
import Comment from "./Comment";
import { Route, Switch } from "react-router-dom";
import Icon from "../shared/Icon";
import { useSelector } from "react-redux";

const Setting = () => {
    const user = useSelector((state) => state.user);

    // Setting Nav show on Mobile
    const [settingNav, setSettingNav] = useState("");

    const showNav = () => {
        return settingNav ? setSettingNav("") : setSettingNav("show");
    };

    return (
        <div
            className="page-wrapper row p-0 m-0"
            style={{ overflowX: "hidden" }}
        >
            {/* col-md-3 */}
            <SettingNav className={settingNav} />

            <button
                onClick={showNav}
                className="setting-menu-btn btn bg-cyan-blur"
            >
                {settingNav === "" ? (
                    <Icon icon="bars" />
                ) : (
                    <Icon icon="times" />
                )}
            </button>

            <div className="d-none d-md-block col-md-3"></div>

            {/* col-md-9 */}
            <div
                className="col-12 col-md-9 pe-2 pe-md-5 d-flex flex-column align-items-center pb-5"
                style={{ paddingTop: "4.4rem" }}
                onClick={() => settingNav && setSettingNav("")}
            >
                <Switch>
                    <Route path="/setting/profile" exact>
                        <Profile user={user} />
                    </Route>

                    <Route path="/setting/password" exact>
                        <Password user={user} />
                    </Route>

                    <Route path="/setting/favorite" exact>
                        <Favorite user={user} />
                    </Route>

                    <Route path="/setting/comment" exact>
                        <Comment user={user} />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Setting;
