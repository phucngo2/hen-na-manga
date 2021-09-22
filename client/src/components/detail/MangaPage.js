// Libs
import React from "react";
import { Link } from "react-router-dom";

const MangaPage = ({ mangaCode, page, imgSrc }) => {
    return (
        <Link
            to={{
                pathname: `/g/${mangaCode}/read`,
                state: {
                    page: page,
                },
            }}
            className="page-item"
        >
            <img src={imgSrc} className="w-100 rounded" alt={imgSrc} />
        </Link>
    );
};

export default MangaPage;
