// Libs
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleDarkMode } from "../../redux/actions";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import "./Nav.css";
import Icon from "../shared/Icon";
import { LOGOUT } from "../../utils/graphql/auth";

const navWrapperStyle = {
    backgroundColor: "#242526",
    position: "fixed",
    width: "100vw",
    zIndex: "69",
    top: 0,
};

const darkModeBtnStyle = {
    height: 32,
    width: 32,
    borderRadius: "100%",
};

const Nav = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    let pathname = location.pathname;
    const [searchInput, setSearchInput] = useState("");

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        history.push({
            pathname: "/search",
            state: { keyword: searchInput },
        });
    };

    const [fetchLogout] = useMutation(LOGOUT, {
        onCompleted: () => {
            dispatch(logout());
            window.location.assign("/");
        },
        onError: () => {},
    });

    return (
        <nav
            className="navbar navbar-expand navbar-dark container-fluid d-flex justify-content-between"
            style={navWrapperStyle}
        >
            <div className="navbar-nav">
                <Link className="navbar-brand" to="/">
                    Manga!
                </Link>
                <div className="d-none d-md-flex">
                    <form className="input-group" onSubmit={handleSubmitSearch}>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search sumthing..."
                            aria-label="Search"
                            onChange={handleInputChange}
                            value={searchInput}
                            disabled={pathname === "/search"}
                        />
                        <button
                            className="btn btn-info"
                            type="submit"
                            disabled={pathname === "/search"}
                        >
                            <Icon
                                icon="search"
                                style={{
                                    color: "white",
                                    fontSize: "1.2rem",
                                }}
                                className="align-self-center"
                            />
                        </button>
                    </form>
                </div>
                <Link className="nav-link ms-1 d-md-none" to="/search">
                    <Icon
                        icon="search"
                        style={{
                            color: "white",
                            fontSize: "1.1rem",
                            opacity: "0.55",
                        }}
                        className="align-self-center"
                    />
                </Link>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link me-2" to="/random">
                        <Icon
                            icon="dice"
                            style={{
                                color: "white",
                                fontSize: "1.1rem",
                                opacity: "0.55",
                            }}
                            className="align-self-center"
                        />
                    </Link>
                </li>
                <li className="nav-item pe-2 pt-1">
                    <button
                        className="nav-link btn d-flex justify-content-center"
                        onClick={() => dispatch(toggleDarkMode())}
                        style={darkModeBtnStyle}
                    >
                        <Icon
                            icon="lightbulb"
                            style={{
                                color: "white",
                                fontSize: "1.1rem",
                                opacity: "0.55",
                            }}
                            className="align-self-center"
                        />
                    </button>
                </li>
                {user ? (
                    <>
                        <li className="nav-item">
                            <Link
                                className="nav-link p-0 text-center my-1 mx-2 d-flex flex-wrap"
                                to="/setting/profile"
                            >
                                <div
                                    className="rounded-circle"
                                    style={{
                                        height: 32,
                                        width: 32,
                                        cursor: "pointer",
                                        backgroundImage: `url(${user.avatar})`,
                                        backgroundPosition: "center center",
                                        backgroundSize: "cover",
                                    }}
                                ></div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <span
                                className="nav-link me-1"
                                onClick={() =>
                                    fetchLogout({
                                        variables: {
                                            userId: user.id,
                                        },
                                    })
                                }
                                style={{ cursor: "pointer" }}
                            >
                                Logout
                            </span>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link me-1" to="/login">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link me-1" to="/register">
                                Sign Up
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Nav;
