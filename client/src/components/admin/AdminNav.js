// Libs
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Icon from "../shared/Icon";

const adminLinks = [
    {
        name: "dashboard",
        icon: "chart-line",
    },
    {
        name: "manga",
        icon: "book",
    },
    {
        name: "user",
        icon: "users",
    },
    {
        name: "comment",
        icon: "comments",
    },
];

const AdminNav = ({ className }) => {
    // Get pathname on URL & set active
    const pathname = window.location.pathname.split("/")[2];

    const [active, setActive] = useState(pathname ? pathname : "");

    return (
        <nav
            className={`navbar navbar-expand col-9 col-md-3 setting-nav p-0 pe-md-5 ${className}`}
            style={{ height: "100vh" }}
        >
            <ul className="navbar-nav h-100 w-100 m-0 py-0 px-3 bg-grey-trans d-flex flex-column justify-content-center align-items-center">
                {adminLinks.map((link) => (
                    <li className="nav-item w-100 my-2" key={link.name}>
                        <Link
                            to={`/admin/${link.name}`}
                            className={`w-100 btn rounded-lg txt-color-app d-flex flex-row align-items-center justify-content-between px-4 ${
                                active === link.name && "bg-cyan-blur"
                            }`}
                            onClick={() => setActive(link.name)}
                        >
                            <Icon icon={link.icon} />
                            <span>
                                <b>
                                    {link.name.charAt(0).toUpperCase() +
                                        link.name.slice(1)}
                                </b>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default AdminNav;
