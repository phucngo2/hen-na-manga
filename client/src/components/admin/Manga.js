// Libs
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";

import SettingElementWrapper from "../setting/SettingElementWrapper";
import Pagination from "../shared/Pagination";
import CustomedModal from "../shared/Modal";
import { DELETE_MANGA, PAGINATE_MANGA_ADMIN } from "../../utils/graphql/manga";
import Loading from "../shared/Loading";
import Icon from "../shared/Icon";

const Manga = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_LIMIT = 10;

    const [searchInput, setSearchInput] = useState("");

    const [fetchMangas, { loading, data }] = useLazyQuery(
        PAGINATE_MANGA_ADMIN,
        {
            onCompleted: () => {
                if (
                    currentPage >
                    Math.ceil(data.paginateManga.mangaCount / PAGE_LIMIT)
                ) {
                    setCurrentPage(1);
                }
            },
        }
    );

    // To handle Cache
    const client = useApolloClient();
    const [deleteMange] = useMutation(DELETE_MANGA, {
        onCompleted: async () => {
            await client.refetchQueries({
                updateCache(cache) {
                    cache.evict({ fieldName: "paginateManga" });
                    cache.gc();
                },
            });
        },
    });

    useEffect(() => {
        fetchMangas({
            variables: {
                page: currentPage,
                limit: PAGE_LIMIT,
                keyword: searchInput,
            },
        });
    }, [currentPage]);

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        fetchMangas({
            variables: {
                page: currentPage,
                limit: PAGE_LIMIT,
                keyword: searchInput,
            },
        });
    };

    const handleDelete = (mangaId) => {
        deleteMange({
            variables: {
                mangaId,
            },
        });
    };

    if (loading || !data) return <Loading />;

    const { mangas, mangaCount } = data.paginateManga;

    return (
        <>
            <h2 className="p-3">
                <Icon icon="book" className="align-self-center me-3" />
                Manga Management
            </h2>
            <SettingElementWrapper className="px-3">
                <div className="d-flex flex-row align-items-center justify-content-between w-100 my-3">
                    <Link className="btn btn-success" to="/admin/manga/form">
                        <Icon
                            icon="plus"
                            style={{ color: "white", fontSize: "1.2rem" }}
                            className="align-self-center"
                        />
                        <b className="ps-2 d-none d-md-inline-block">Add new</b>
                    </Link>
                    <form
                        className="input-group favorite-search-form"
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
                </div>
                {mangas.length === 0 ? (
                    <h4 className="p-3">No Result!</h4>
                ) : (
                    <>
                        <table className="table table-bordered w-100 table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Code</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className="table-light">
                                {mangas.map((manga) => (
                                    <tr key={manga.id}>
                                        <td>{manga.code}</td>
                                        <td>
                                            <img
                                                src={manga.coverImgSrc}
                                                className="table-img rounded"
                                                alt={manga.name}
                                            />
                                        </td>
                                        <td>{manga.name}</td>
                                        <td>
                                            <Link
                                                className="btn btn-primary"
                                                to={{
                                                    pathname:
                                                        "/admin/manga/form",
                                                    state: {
                                                        mangaId: manga.id,
                                                    },
                                                }}
                                            >
                                                <Icon
                                                    icon="edit"
                                                    style={{
                                                        color: "white",
                                                    }}
                                                    className="align-self-center"
                                                />
                                            </Link>
                                        </td>
                                        <td>
                                            <CustomedModal
                                                Component={
                                                    <button className="btn btn-danger">
                                                        <Icon
                                                            icon="trash"
                                                            style={{
                                                                color: "white",
                                                            }}
                                                            className="align-self-center"
                                                        />
                                                    </button>
                                                }
                                                header="Warning!"
                                                content="Are you sure want to delete?"
                                                handleDelete={() =>
                                                    handleDelete(manga.id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            pageLimit={PAGE_LIMIT}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalItems={mangaCount}
                            className="mb-0"
                        />
                    </>
                )}
            </SettingElementWrapper>
        </>
    );
};

export default Manga;
