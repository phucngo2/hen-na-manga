// Libs
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Icon from "../shared/Icon";
import { companyEmail } from "../../utils/constants";

const settingLinks = [
    {
        name: "profile",
        icon: "user-circle",
    },
    {
        name: "password",
        icon: "unlock-alt",
    },
    {
        name: "favorite",
        icon: "heartbeat",
    },
    {
        name: "comment",
        icon: "comments",
    },
];

const SettingNav = ({ className }) => {
    const user = useSelector((state) => state.user);
    // Get pathname on URL & set active
    const pathname = window.location.pathname.split("/setting/")[1];

    const [active, setActive] = useState(pathname ? pathname : "");

    return (
        <nav
            className={`navbar navbar-expand col-9 col-md-3 setting-nav p-0 pe-md-5 ${className}`}
            style={{ height: "100vh" }}
        >
            <div className="h-100 w-100 m-0 py-0 px-3 bg-grey-trans d-flex flex-column justify-content-center align-items-center">
                <ul className="navbar-nav h-75 w-100 d-flex flex-column justify-content-center align-items-center">
                    {settingLinks.map((link) => (
                        <li className="nav-item w-100 my-2" key={link.name}>
                            <Link
                                to={`/setting/${link.name}`}
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

                    {user.isAdmin && (
                        <li className="nav-item w-100 my-2" key="admin">
                            <Link
                                to={`/admin/dashboard`}
                                className="w-100 btn rounded-lg txt-color-app d-flex flex-row align-items-center justify-content-between px-4"
                            >
                                <Icon icon="user-cog" />
                                <span>
                                    <b>Admin</b>
                                </span>
                            </Link>
                        </li>
                    )}
                </ul>

                <a className="btn btn-success" href={`mailto: ${companyEmail}`}>
                    <Icon icon="envelope" className="me-2" />
                    <b>Contact us</b>
                </a>
            </div>
        </nav>
    );
};

export default SettingNav;
