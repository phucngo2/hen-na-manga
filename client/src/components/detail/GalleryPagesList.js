// Libs
import React, { useState } from "react";

// Components
import ElementWrapper from "../shared/ElementWrapper";
import MangaPage from "./MangaPage";
import Pagination from "../shared/Pagination";

const GalleryPagesList = ({ manga }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_LIMIT = 24;

    const renderPages = manga.pages.slice(
        PAGE_LIMIT * (currentPage - 1),
        PAGE_LIMIT * (currentPage - 1) + PAGE_LIMIT
    );

    return (
        <ElementWrapper>
            <div className="row m-0 py-3 px-1 w-100">
                {renderPages.map((page) => (
                    <MangaPage
                        key={page.pageNumber}
                        mangaCode={manga.code}
                        page={page.pageNumber}
                        imgSrc={page.pageSrc}
                    />
                ))}
            </div>
            <Pagination
                pageLimit={PAGE_LIMIT}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={manga.pages.length}
            />
        </ElementWrapper>
    );
};

export default GalleryPagesList;
