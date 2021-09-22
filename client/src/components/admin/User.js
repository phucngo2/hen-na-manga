// Libs
import React, { useEffect, useState } from "react";
import moment from "moment";

import SettingElementWrapper from "../setting/SettingElementWrapper";
import Pagination from "../shared/Pagination";
import CustomedModal from "../shared/Modal";
import Icon from "../shared/Icon";
import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { PAGINATE_USER, DELETE_USER } from "../../utils/graphql/user";
import Loading from "../shared/Loading";

const User = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_LIMIT = 10;

    // Search Input state
    const [searchInput, setSearchInput] = useState("");
    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const [fetchUsers, { loading, data }] = useLazyQuery(PAGINATE_USER, {
        onCompleted: () => {
            if (
                currentPage >
                Math.ceil(data.paginateUser.mangaCount / PAGE_LIMIT)
            ) {
                setCurrentPage(1);
            }
        },
    });

    useEffect(() => {
        fetchUsers({
            variables: {
                page: currentPage,
                limit: PAGE_LIMIT,
                keyword: searchInput,
            },
        });
    }, [currentPage]);

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        fetchUsers({
            variables: {
                page: currentPage,
                limit: PAGE_LIMIT,
                keyword: searchInput,
            },
        });
    };

    // To handle Cache
    const client = useApolloClient();
    const [deleteUser] = useMutation(DELETE_USER, {
        onCompleted: async () => {
            await client.refetchQueries({
                updateCache(cache) {
                    cache.evict({ fieldName: "paginateUser" });
                },
            });
        },
        onError: () => {},
    });

    const handleDelete = (userId) => {
        deleteUser({
            variables: {
                userId,
            },
        });
    };

    if (loading || !data) return <Loading />;

    const { users, userCount } = data.paginateUser;
    // Initialize index
    var userIndex = (currentPage - 1) * PAGE_LIMIT;

    return (
        <>
            <h2 className="p-3">
                <Icon icon="users" className="align-self-center me-3" />
                User Management
            </h2>
            <SettingElementWrapper className="px-3">
                <div className="d-flex flex-row align-items-center justify-content-between w-100 my-3">
                    <form
                        className="input-group favorite-search-form ms-auto"
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
                <table className="table table-bordered w-100 table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Created</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-light">
                        {users.map((user) => {
                            userIndex++;
                            return (
                                <tr key={user.id}>
                                    <td>{userIndex}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        {user.createdAt &&
                                            moment(user.createdAt).fromNow()}
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
                                                    {/* <b className="ps-2 d-none d-md-inline-block">
                                            Delete
                                        </b> */}
                                                </button>
                                            }
                                            header="Warning!"
                                            content="Are you sure want to delete?"
                                            handleDelete={() =>
                                                handleDelete(user.id)
                                            }
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination
                    pageLimit={PAGE_LIMIT}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={userCount}
                    className="mb-0"
                />
            </SettingElementWrapper>
        </>
    );
};

export default User;
