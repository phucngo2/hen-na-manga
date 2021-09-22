// Libs
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
import GalleryInformation from "./GalleryInformation";
import GalleryPagesList from "./GalleryPagesList";
import GalleryRecommendation from "./GalleryRecommendation";
import GalleryComment from "./GalleryComment";

const Gallery = ({ manga }) => {
    // For checking user Login to disable favorite button
    const user = useSelector((state) => state.user);

    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <GalleryInformation manga={manga} user={user} />
            <GalleryPagesList manga={manga} />
            <GalleryRecommendation manga={manga} />
            {showComments ? (
                <GalleryComment manga={manga} user={user} />
            ) : (
                <button
                    className="btn btn-info mt-2 mb-5"
                    onClick={() => setShowComments(true)}
                >
                    Show comments
                </button>
            )}
        </>
    );
};

export default Gallery;
