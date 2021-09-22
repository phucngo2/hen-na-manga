import React, { useEffect, useState } from "react";

import SettingElementWrapper from "./SettingElementWrapper";
import Pagination from "../shared/Pagination";
import Icon from "../shared/Icon";
import Loading from "../shared/Loading";
import { useLazyQuery } from "@apollo/client";
import { LIST_COMMENT_USER } from "../../utils/graphql/comment";
import Info from "../shared/Info";
import CommentItem from "./CommentItem";

const Comment = ({ user }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_LIMIT = 10;
    // Handle Search
    const [searchInput, setSearchInput] = useState("");
    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const [fetchComment, { loading, data }] = useLazyQuery(LIST_COMMENT_USER, {
        onCompleted: () => {
            if (
                currentPage >
                Math.ceil(data.listCommentsByUserId.commentCount / PAGE_LIMIT)
            ) {
                setCurrentPage(1);
            }
        },
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        fetchComment({
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
        fetchComment({
            variables: {
                userId: user.id,
                page: currentPage,
                limit: PAGE_LIMIT,
                keyword: searchInput,
            },
        });
    };

    if (loading || !data) return <Loading />;

    return (
        <>
            <h2 className="p-3">
                <Icon icon="comments" className="align-self-center me-3" />
                Comment
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
            <SettingElementWrapper className="px-4 py-4">
                {data.listCommentsByUserId.commentCount === 0 ? (
                    <Info
                        message="You don't have any comment"
                        className="p-3"
                        fontSize="20"
                    />
                ) : (
                    <>
                        {data.listCommentsByUserId.comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
                        <Pagination
                            pageLimit={PAGE_LIMIT}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalItems={data.listCommentsByUserId.commentCount}
                            className="mb-0"
                        />
                    </>
                )}
            </SettingElementWrapper>
        </>
    );
};

export default Comment;
