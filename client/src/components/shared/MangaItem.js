// Libs
import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./MangaItem.css";

const MangaItem = ({ mangaItem }) => {
    return (
        <Link to={`/g/${mangaItem.code}`}>
            <img
                src={mangaItem.coverImgSrc}
                className="w-100 rounded-top"
                alt={mangaItem.name}
            />
            <h6 className="text-center p-2 bg-card text-light rounded-bottom">
                {mangaItem.name}
            </h6>
        </Link>
    );
};

export default MangaItem;
