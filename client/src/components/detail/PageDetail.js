// Libs
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import ElementWrapper from "../shared/ElementWrapper";
import PageDetailNav from "./PageDetailNav";

const PageDetail = ({ manga }) => {
    // Declare
    // React Router
    const location = useLocation();
    const page = location.state ? location.state.page : 1;

    // State
    const [thisPage, setThisPage] = useState(page);
    const [imgSize, setImgSize] = useState(100);

    const handleClick = (event) => {
        // User click on the left side
        if (event.clientX < event.view.outerWidth / 2) {
            // Current page is 0
            if (thisPage === 1) {
                return;
            }
            setThisPage(thisPage - 1);
            return;
        }

        // User click on the right side
        // Current page is the maximum number of pages
        if (thisPage === manga.pages.length) {
            return;
        }
        setThisPage(thisPage + 1);
    };

    return (
        <ElementWrapper className="py-2">
            <PageDetailNav
                imgSize={imgSize}
                setImgSize={setImgSize}
                pages_num={manga.pages.length}
                mangaCode={manga.code}
                thisPage={thisPage}
                setThisPage={setThisPage}
            />
            <div
                className="manga-page-detail text-center w-100 h-100"
                onClick={handleClick}
            >
                <img
                    src={manga.pages[thisPage - 1].pageSrc}
                    className="rounded manga-page-detail"
                    style={{ width: `${imgSize}%` }}
                    alt={manga.name}
                />
            </div>
            <PageDetailNav
                imgSize={imgSize}
                setImgSize={setImgSize}
                pages_num={manga.pages.length}
                mangaCode={manga.code}
                thisPage={thisPage}
                setThisPage={setThisPage}
            />
        </ElementWrapper>
    );
};

export default PageDetail;
