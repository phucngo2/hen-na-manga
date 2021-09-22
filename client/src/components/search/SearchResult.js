// Libs
import React from "react";

// Components
import MangaList from "../shared/MangaList";
import SearchFilter from "./SearchFilter";
import Pagination from "../shared/Pagination";
import Icon from "../shared/Icon";

const SearchResult = ({
    mangas,
    mangaCount,
    PAGE_LIMIT,
    currentPage,
    setCurrentPage,
    filter,
    setFilter,
}) => {
    return (
        <>
            <MangaList
                title={
                    <h4>
                        <Icon
                            icon="search"
                            className="align-self-center me-3"
                        />
                        {mangaCount} Result(s)
                    </h4>
                }
                mangaList={mangas}
            >
                <SearchFilter filter={filter} setFilter={setFilter} />
            </MangaList>
            <Pagination
                pageLimit={PAGE_LIMIT}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={mangaCount}
            />
        </>
    );
};

export default SearchResult;
