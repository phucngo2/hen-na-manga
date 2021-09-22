import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import SettingElementWrapper from "../setting/SettingElementWrapper";
import Pagination from "../shared/Pagination";
import Icon from "../shared/Icon";
import { LIST_FLAGGED_COMMENTS } from "../../utils/graphql/comment";
import Loading from "../shared/Loading";
import CommentItem from "./CommentItem";

const Comment = () => {
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_LIMIT = 10;

    // Input
    const [searchInput, setSearchInput] = useState("");

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    // Submit
    const [fetchComment, { loading, data }] = useLazyQuery(
        LIST_FLAGGED_COMMENTS,
        {
            onCompleted: () => {
                if (
                    currentPage >
                    Math.ceil(
                        data.listFlaggedComments.commentCount / PAGE_LIMIT
                    )
                ) {
                    setCurrentPage(1);
                }
            },
            fetchPolicy: "network-only",
            onError: () => {},
        }
    );

    useEffect(() => {
        fetchComment({
            variables: {
                page: currentPage,
                limit: PAGE_LIMIT,
                keyword: searchInput,
            },
        });
    }, [currentPage]);

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        fetchComment({
            variables: {
                page: currentPage,
                limit: PAGE_LIMIT,
                keyword: searchInput,
            },
        });
    };

    if (loading || !data) {
        return <Loading />;
    }

    return (
        <>
            <h2 className="p-3">
                <Icon icon="comments" className="align-self-center me-3" />
                Comments Reported
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
                <div className="w-100 d-flex flex-column">
                    {data.listFlaggedComments.comments.map((comment) => (
                        <CommentItem comment={comment} key={comment.id} />
                    ))}
                </div>
                <Pagination
                    pageLimit={PAGE_LIMIT}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={data.listFlaggedComments.commentCount}
                    className="mb-0"
                />
            </SettingElementWrapper>
        </>
    );
};

export default Comment;
