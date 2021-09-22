// Libs
import React from "react";
import { Link } from "react-router-dom";
import Icon from "../shared/Icon";

const PageDetailNav = ({
    imgSize,
    setImgSize,
    pages_num,
    mangaCode,
    thisPage,
    setThisPage,
}) => {
    const pageNumList = Array.from({ length: pages_num }, (_, i) => i + 1);

    const decreaseImgSize = () => {
        if (imgSize === 50) return;
        setImgSize(imgSize - 25);
    };

    const increaseImgSize = () => {
        if (imgSize === 200) return;
        setImgSize(imgSize + 25);
    };

    return (
        <div className="navbar row w-100 p-2 my-1">
            <div className="navbar-nav col-6 col-md-3 p-0 d-flex flex-row justify-content-start align-items-center">
                <Link to={`/g/${mangaCode}`} className="me-2 me-md-3">
                    <Icon
                        icon="reply"
                        className="txt-color-app btn-icon-size"
                    />
                </Link>
                <select
                    className="form-select py-0 w-fit-content"
                    value={thisPage}
                    onChange={(event) =>
                        setThisPage(parseInt(event.target.value))
                    }
                >
                    {pageNumList.map((pageNum) => (
                        <option value={pageNum} key={pageNum}>
                            {pageNum}
                        </option>
                    ))}
                </select>
            </div>
            <div className="navbar-nav col-6 p-0 d-flex flex-row justify-content-center align-items-center">
                <Icon
                    icon="angle-double-left"
                    className="txt-color-app mx-2 btn-icon-size cursor-pointer"
                    style={thisPage !== 1 ? {} : { visibility: "hidden" }}
                    onClick={() => setThisPage(1)}
                />
                <Icon
                    icon="angle-left"
                    className="txt-color-app mx-2 btn-icon-size cursor-pointer"
                    style={thisPage !== 1 ? {} : { visibility: "hidden" }}
                    onClick={() => setThisPage(thisPage - 1)}
                />
                <div className="d-flex flex-row justify-content-center align-items-center px-2 px-md-3">
                    <span>
                        {thisPage}/{pages_num}
                    </span>
                </div>
                <Icon
                    icon="angle-right"
                    className="txt-color-app mx-2 btn-icon-size cursor-pointer"
                    style={
                        thisPage !== pages_num ? {} : { visibility: "hidden" }
                    }
                    onClick={() => setThisPage(thisPage + 1)}
                />
                <Icon
                    icon="angle-double-right"
                    className="txt-color-app mx-2 btn-icon-size cursor-pointer"
                    style={
                        thisPage !== pages_num ? {} : { visibility: "hidden" }
                    }
                    onClick={() => setThisPage(pages_num)}
                />
            </div>
            <div className="navbar-nav col-6 col-md-3 p-0 mt-3 my-md-0 d-flex flex-row justify-content-md-end align-items-center">
                <span onClick={decreaseImgSize} className="cursor-pointer">
                    <Icon
                        icon="search-minus"
                        className="txt-color-app btn-icon-size"
                    />
                </span>
                <span className="px-3">{imgSize}%</span>
                <span onClick={increaseImgSize} className="cursor-pointer">
                    <Icon
                        icon="search-plus"
                        className="txt-color-app btn-icon-size"
                    />
                </span>
            </div>
        </div>
    );
};

export default PageDetailNav;
