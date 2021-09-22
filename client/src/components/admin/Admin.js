// Libs
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import AdminNav from "./AdminNav";
import Dashboard from "./Dashboard";
import Manga from "./Manga";
import User from "./User";
import MangaForm from "./MangaForm";
import "./Admin.css";
import Comment from "./Comment";
import Icon from "../shared/Icon";

const Admin = () => {
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
            <AdminNav className={settingNav} />

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
                    <Route path="/admin/dashboard" exact>
                        <Dashboard />
                    </Route>

                    <Route path="/admin/manga" exact>
                        <Manga />
                    </Route>

                    <Route path="/admin/manga/form">
                        <MangaForm />
                    </Route>

                    <Route path="/admin/user" exact>
                        <User />
                    </Route>

                    <Route path="/admin/comment" exact>
                        <Comment />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Admin;
