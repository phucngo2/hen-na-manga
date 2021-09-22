// Libs
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

// Components
import PageWrapper from "../shared/PageWrapper";
import SearchOptions from "./SearchOptions";
import SearchResult from "./SearchResult";
import "./Search.css";
import { SEARCH_MANGA } from "../../utils/graphql/manga";
import Loading from "../shared/Loading";
import { useForm, useSelectTag } from "../../utils/hooks";
import Icon from "../shared/Icon";

const Search = () => {
    let location = useLocation();
    // For pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("Latest");

    // Form handle (Search Option)
    const initialState = {
        keyword:
            location.state && location.state.keyword
                ? location.state.keyword
                : "",
        category:
            location.state && location.state.category
                ? location.state.category
                : "",
        language:
            location.state && location.state.language
                ? location.state.language
                : "",
    };

    const { values, onChange, onSubmit } = useForm(handleSubmit, initialState);
    const { selectedTags, handleSelectTag, handleDeleteTag } = useSelectTag(
        location.state && location.state.tag ? [location.state.tag] : []
    );

    // Search query
    const [search, { loading, data }] = useLazyQuery(SEARCH_MANGA);

    useEffect(() => {
        search({
            variables: {
                keyword: values.keyword,
                category: values.category,
                language: values.language,
                tags: selectedTags,
                page: currentPage,
                limit: PAGE_LIMIT,
                filter: filter,
            },
        });
    }, [currentPage, filter]);

    function handleSubmit() {
        setCurrentPage(1);
        search({
            variables: {
                keyword: values.keyword,
                category: values.category,
                language: values.language,
                tags: selectedTags,
                page: 1,
                limit: PAGE_LIMIT,
                filter: filter,
            },
        });
    }

    if (loading) return <Loading />;
    return (
        <PageWrapper>
            <SearchOptions
                onSubmit={onSubmit}
                onChange={onChange}
                values={values}
                handleSelectTag={handleSelectTag}
                handleDeleteTag={handleDeleteTag}
                selectedTags={selectedTags}
            />
            {data && data.searchManga.mangas.length === 0 && (
                <h4 className="py-4">
                    <Icon icon="search" className="align-self-center me-3" />0
                    Result!
                </h4>
            )}
            {data && data.searchManga.mangas.length > 0 && (
                <SearchResult
                    mangas={data.searchManga.mangas}
                    mangaCount={data.searchManga.mangaCount}
                    PAGE_LIMIT={PAGE_LIMIT}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    filter={filter}
                    setFilter={setFilter}
                />
            )}
        </PageWrapper>
    );
};

export default Search;

const PAGE_LIMIT = 25;
