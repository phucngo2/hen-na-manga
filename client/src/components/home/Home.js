// Libs
import React, { useState } from "react";
import { useQuery } from "@apollo/client";

// Components
import MangaList from "../shared/MangaList";
import Pagination from "../shared/Pagination";
import PageWrapper from "../shared/PageWrapper";
import Icon from "../shared/Icon";
import Loading from "../shared/Loading";
import { LIST_POPULAR_MANGA, PAGINATE_MANGA } from "../../utils/graphql/manga";

const Home = () => {
    // Handle pagination
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_LIMIT = 25;

    // Fetch Popular Manga, if page is !== 1, skip this query
    const popularResult = useQuery(LIST_POPULAR_MANGA, {
        skip: currentPage !== 1,
    });
    // Fetch new Manga with Pagination
    const paginateResult = useQuery(PAGINATE_MANGA, {
        variables: {
            page: currentPage,
            limit: PAGE_LIMIT,
        },
    });

    // Loading...
    if (paginateResult.loading || popularResult.loading) {
        return <Loading />;
    }

    if (paginateResult.error) {
        console.log(JSON.stringify(paginateResult.error, null, 2));
    }

    // Render
    if (currentPage === 1) {
        return (
            <PageWrapper>
                <MangaList
                    title={
                        <h3>
                            <Icon
                                icon="fire"
                                className="align-self-center me-3"
                            />
                            Popular
                        </h3>
                    }
                    mangaList={popularResult.data.listPopularMangas}
                />

                <MangaList
                    title={
                        <h3>
                            <Icon
                                icon="box-tissue"
                                className="align-self-center me-3"
                            />
                            New Upload
                        </h3>
                    }
                    mangaList={paginateResult.data.paginateManga.mangas}
                />

                <Pagination
                    pageLimit={PAGE_LIMIT}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={paginateResult.data.paginateManga.mangaCount}
                />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <MangaList
                title={
                    <h3>
                        <Icon
                            icon="box-tissue"
                            className="align-self-center me-3"
                        />
                        New Upload
                    </h3>
                }
                mangaList={paginateResult.data.paginateManga.mangas}
            />

            <Pagination
                pageLimit={PAGE_LIMIT}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={paginateResult.data.paginateManga.mangaCount}
            />
        </PageWrapper>
    );
};

export default Home;
