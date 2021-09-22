import React, { useEffect, useState } from "react";

import MangaList from "../shared/MangaList";
import Pagination from "../shared/Pagination";
import Icon from "../shared/Icon";
import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import {
    FAVORITE_MANGA,
    LIST_FAVORITE_MANGAS,
} from "../../utils/graphql/manga";
import Loading from "../shared/Loading";
import Info from "../shared/Info";

const Favorite = ({ user }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_LIMIT = 20;

    // Handle Search
    const [searchInput, setSearchInput] = useState("");

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const [fetchFavorites, { loading, data }] = useLazyQuery(
        LIST_FAVORITE_MANGAS,
        {
            onCompleted: () => {
                if (
                    currentPage >
                    Math.ceil(data.paginateFavorite.mangaCount / PAGE_LIMIT)
                ) {
                    setCurrentPage(1);
                }
            },
        }
    );

    useEffect(() => {
        fetchFavorites({
            variables: {
                userId: user.id,
                page: currentPage,
                limit: PAGE_LIMIT,
                keyword: searchInput,
            },
        });
    }, [currentPage]);

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        fetchFavorites({
            variables: {
                userId: user.id,
                page: currentPage,
                limit: PAGE_LIMIT,
                keyword: searchInput,
            },
        });
    };
    // To handle Cache
    const client = useApolloClient();
    const [unfavoriteManga] = useMutation(FAVORITE_MANGA, {
        onError: (err) => console.log(JSON.stringify(err, null, 2)),
        onCompleted: async (result) => {
            await client.refetchQueries({
                updateCache(cache) {
                    // Refecth paginate favorite manga
                    cache.evict({
                        fieldName: "paginateFavorite",
                    });

                    // Refetch MangaDetail with code
                    cache.evict({
                        id: "ROOT_QUERY",
                        fieldName: "getMangaDetail",
                        args: {
                            mangaCode: Number.parseInt(result.favoriteManga),
                        },
                    });

                    // Garbage collection
                    cache.gc();
                },
            });
        },
    });

    if (loading || !data) return <Loading />;

    return (
        <>
            <h2 className="p-3">
                <Icon icon="heartbeat" className="align-self-center me-3" />
                Favorite
            </h2>
            <form
                className="input-group pb-3 favorite-search-form"
                onSubmit={handleSubmitSearch}
            >
                <input
                    className="form-control"
                    type="text"
                    onChange={handleInputChange}
                    value={searchInput}
                />
                <button className="btn btn-info" type="submit">
                    <Icon
                        icon="search"
                        style={{ color: "white", fontSize: "1.2rem" }}
                        className="align-self-center"
                    />
                </button>
            </form>
            {data.paginateFavorite.mangaCount === 0 ? (
                <Info
                    message="We could not find any favorite manga"
                    className="p-3"
                    fontSize="20"
                />
            ) : (
                <>
                    <MangaList
                        mangaList={data.paginateFavorite.mangas}
                        itemClassName="four"
                        handleDelete={unfavoriteManga}
                        user={user}
                        client={client}
                    />
                    <Pagination
                        pageLimit={PAGE_LIMIT}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalItems={data.paginateFavorite.mangaCount}
                    />
                </>
            )}
        </>
    );
};

export default Favorite;
