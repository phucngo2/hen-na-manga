// Libs
import React from "react";
import { useSelector } from "react-redux";
import Icon from "./Icon";

import "./Pagination.css";

// Generate an array contains number from _ to _
const range = (from, to) => {
    let i = from;
    var arr = [];

    while (i <= to) {
        arr.push(i);
        i++;
    }

    return arr;
};

const Pagination = ({
    pageLimit,
    totalItems,
    currentPage,
    setCurrentPage,
    className = "",
}) => {
    // Style
    const isDarkMode = useSelector((state) => state.isDarkMode);

    const pageBtnStyle = {
        color: isDarkMode ? "#EEE" : "#111",
        fontSize: 18,
    };

    const pageActive = {
        backgroundColor: "rgba(127, 127, 127, 0.21)",
    };

    // Logic
    const pageNeighbours = 3;
    const maxPage = Math.ceil(totalItems / pageLimit);
    // const [pageList, setPageList] = useState([]);

    var pageList = [];

    /**
     * ----- HANDLE GENERATE PAGINATION LIST ------
     * This function will generate page list to display on Pagination Navigator
     *
     * If neighbours is 3, out pagination block will look like:
     * [<<] [<] [6] [7] [8] {9} [10] [11] [12] [>] [>>]
     *
     * #Note:
     * 'S' is [<<] stands for Start
     * 'E' is [>>] stands for End
     * 'L' is [<] stands for Left
     * 'R' is [>] stands for Right
     * 'N...' is [not display], the number is to prevent duplicate element key
     *
     * Number of buttons in the pagination nav will be:
     *   current + neighbours * 2 + (next + previous button) + (first + last button)
     */
    const generatePageList = () => {
        var startPage, endPage;

        // If the maxPage <= 1, we will only show 1
        if (maxPage <= 1) {
            pageList = [];
            return;
        }

        // Else, we will show pages and [<<] [<] [>] [>>] buttons
        // Start Page Number cannot be less than 1
        startPage =
            currentPage - pageNeighbours > 0 ? currentPage - pageNeighbours : 1;
        // End Page Number cannot exceed max page
        endPage =
            currentPage + pageNeighbours < maxPage + 1
                ? currentPage + pageNeighbours
                : maxPage;

        // Page 1 done have [<] & [<<]
        if (currentPage === 1) {
            pageList = ["N0", "N1", ...range(startPage, endPage), "R", "E"];
            return;
        }

        // maxPage don't have [>] & [>>]
        if (currentPage === maxPage) {
            pageList = ["S", "L", ...range(startPage, endPage), "N2", "N3"];
            return;
        }

        pageList = ["S", "L", ...range(startPage, endPage), "R", "E"];
    };

    generatePageList();

    if (pageList.length === 0) return <></>;

    // Render
    return (
        <nav
            className="d-flex justify-content-center align-items-center my-3"
            style={{ width: "100%" }}
        >
            <ul
                className={`pagination d-flex justify-content-center align-items-center ${className}`}
            >
                {pageList.map((pageIndex) => {
                    if (
                        typeof pageIndex == "string" &&
                        pageIndex.startsWith("N")
                    ) {
                        return (
                            <li key={pageIndex} className="page-item">
                                <button
                                    className="btn page-btn d-flex justify-content-center align-items-center"
                                    disabled
                                ></button>
                            </li>
                        );
                    }
                    if (pageIndex === "S") {
                        return (
                            <li key={pageIndex} className="page-item">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    style={pageBtnStyle}
                                    className="btn page-btn d-flex justify-content-center align-items-center"
                                >
                                    <Icon icon="angle-double-left" size="lg" />
                                </button>
                            </li>
                        );
                    }
                    if (pageIndex === "E") {
                        return (
                            <li key={pageIndex} className="page-item">
                                <button
                                    onClick={() => setCurrentPage(maxPage)}
                                    style={pageBtnStyle}
                                    className="btn page-btn d-flex justify-content-center align-items-center"
                                >
                                    <Icon icon="angle-double-right" size="lg" />
                                </button>
                            </li>
                        );
                    }
                    if (pageIndex === "L") {
                        return (
                            <li key={pageIndex} className="page-item">
                                <button
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                    style={pageBtnStyle}
                                    className="btn page-btn d-flex justify-content-center align-items-center"
                                >
                                    <Icon icon="angle-left" size="lg" />
                                </button>
                            </li>
                        );
                    }
                    if (pageIndex === "R") {
                        return (
                            <li key={pageIndex} className="page-item">
                                <button
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                    style={pageBtnStyle}
                                    className="btn page-btn d-flex justify-content-center align-items-center"
                                >
                                    <Icon icon="angle-right" size="lg" />
                                </button>
                            </li>
                        );
                    }
                    return (
                        <li key={pageIndex} className="page-item">
                            <button
                                onClick={() => setCurrentPage(pageIndex)}
                                style={
                                    currentPage === pageIndex
                                        ? { ...pageBtnStyle, ...pageActive }
                                        : pageBtnStyle
                                }
                                className="btn page-btn d-flex justify-content-center align-items-center"
                            >
                                {pageIndex}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Pagination;
