// Libs
import React from "react";
import moment from "moment";
import { useApolloClient, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

// Components
import ElementWrapper from "../shared/ElementWrapper";
import TagList from "./TagList";
import Icon from "../shared/Icon";
import { FAVORITE_MANGA, GET_MANGA } from "../../utils/graphql/manga";

const GalleryInformation = ({ manga, user }) => {
    // To handle Cache
    const client = useApolloClient();
    const [favoriteManga, { loading }] = useMutation(FAVORITE_MANGA, {
        onCompleted: async () => {
            await client.refetchQueries({
                updateCache(cache) {
                    cache.evict({ fieldName: "paginateFavorite" });
                    cache.gc();
                },
            });
        },
        refetchQueries: [
            {
                query: GET_MANGA,
                variables: { mangaCode: manga.code },
            },
        ],
        onError: () => {},
    });

    const handleFavoriteManga = () => {
        favoriteManga({
            variables: {
                userId: user.id,
                mangaId: manga.id,
            },
        });
    };

    return (
        <ElementWrapper className="py-3">
            <div className="row m-0 pt-3 px-1 w-100">
                <div className="col-12 col-md-7 d-flex justify-content-center">
                    <Link
                        to={{
                            pathname: `/g/${manga.code}/read`,
                            state: {
                                page: 1,
                            },
                        }}
                        className="cover-img"
                    >
                        <img
                            className="rounded w-100"
                            src={manga.coverImgSrc}
                            alt={manga.name}
                        />
                    </Link>
                </div>
                <div className="col-12 col-md-5 p-3">
                    <h1 className="txt-22">{manga.name}</h1>
                    <h2 className="txt-15 opacity-blur">{manga.alias}</h2>
                    <h4 className="txt-15 pb-3 opacity-blur">
                        <b>#{manga.code}</b>
                    </h4>
                    {manga.parodies.length > 0 && (
                        <h6 className="txt-15 pb-1">
                            Parodies:{" "}
                            {manga.parodies.map((parody) => (
                                <Link
                                    key={`parody ${parody}`}
                                    className="color-trans btn-tag m-1 rounded"
                                    to={{
                                        pathname: "/search",
                                        state: {
                                            keyword: parody,
                                        },
                                    }}
                                >
                                    {parody}
                                </Link>
                            ))}
                        </h6>
                    )}
                    {manga.characters.length > 0 && (
                        <h6 className="txt-15 pb-1">
                            Character:{" "}
                            {manga.characters.map((character) => (
                                <Link
                                    key={`character ${character}`}
                                    className="color-trans btn-tag m-1 rounded"
                                    to={{
                                        pathname: "/search",
                                        state: {
                                            keyword: character,
                                        },
                                    }}
                                >
                                    {character}
                                </Link>
                            ))}
                        </h6>
                    )}
                    <TagList tagList={manga.tags} />
                    <h6 className="txt-15 pb-1">
                        Artist:{" "}
                        <Link
                            className="color-trans btn-tag m-1 rounded"
                            to={{
                                pathname: "/search",
                                state: {
                                    keyword: manga.artist,
                                },
                            }}
                        >
                            {manga.artist}
                        </Link>
                    </h6>
                    {manga.group && (
                        <h6 className="txt-15 pb-1">
                            Group:{" "}
                            <Link
                                className="color-trans btn-tag m-1 rounded"
                                to={{
                                    pathname: "/search",
                                    state: {
                                        keyword: manga.group,
                                    },
                                }}
                            >
                                {manga.group}
                            </Link>
                        </h6>
                    )}
                    <h6 className="txt-15 pb-1">
                        Language:{" "}
                        <Link
                            className="color-trans btn-tag m-1 rounded"
                            to={{
                                pathname: "/search",
                                state: {
                                    language: manga.language,
                                },
                            }}
                        >
                            {manga.language}
                        </Link>
                    </h6>
                    <h6 className="txt-15 pb-1">
                        Category:{" "}
                        <Link
                            className="color-trans btn-tag m-1 rounded"
                            to={{
                                pathname: "/search",
                                state: {
                                    category: manga.category,
                                },
                            }}
                        >
                            {manga.category}
                        </Link>
                    </h6>
                    <h6 className="txt-15 pb-1">
                        Pages:{" "}
                        <span
                            className="color-trans btn-tag m-1 rounded"
                            style={{ cursor: "auto" }}
                        >
                            {manga.pages.length}
                        </span>
                    </h6>
                    <h6 className="txt-15 pb-1">
                        Uploaded: {moment(manga.uploadedAt).fromNow()}
                    </h6>
                    <div className="pt-3">
                        {loading ? (
                            <div className="text-center">
                                <h6>Loading...</h6>
                                <div className="spinner-border text-info"></div>
                            </div>
                        ) : (
                            <button
                                className="btn"
                                style={{
                                    backgroundColor: "#F472B6",
                                    color: "white",
                                }}
                                disabled={!user}
                                onClick={handleFavoriteManga}
                            >
                                <Icon icon="heartbeat" className="me-2" />
                                {manga.isFavorited ? (
                                    <b>
                                        Unfavorite {` (${manga.favoriteCount})`}
                                    </b>
                                ) : (
                                    <b>
                                        Favorite {` (${manga.favoriteCount})`}
                                    </b>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </ElementWrapper>
    );
};

export default GalleryInformation;
