import React, { useState } from "react";
import moment from "moment";

import ElementWrapper from "../shared/ElementWrapper";
import Icon from "../shared/Icon";
import Loading from "../shared/Loading";
import ReportForm from "./ReportForm";
import Info from "../shared/Info";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COMMENT, LIST_COMMENT_MANGA } from "../../utils/graphql/comment";
import Alert from "../shared/Alert";

const GalleryComment = ({ manga, user }) => {
    const [comment, setComment] = useState("");

    const [addComment, addCommentResult] = useMutation(ADD_COMMENT, {
        variables: {
            mangaId: manga.id,
            body: comment,
        },
        // Update cache (add new comment)
        update: (cache, result) => {
            const cacheData = cache.readQuery({
                query: LIST_COMMENT_MANGA,
                variables: {
                    mangaId: manga.id,
                },
            });

            const newData = [
                result.data.addComment,
                ...cacheData.listCommentsByMangaId,
            ];

            cache.writeQuery({
                query: LIST_COMMENT_MANGA,
                variables: {
                    mangaId: manga.id,
                },
                data: {
                    ...data,
                    listCommentsByMangaId: newData,
                },
            });
        },
        onError: () => {},
    });

    const { loading, data, error } = useQuery(LIST_COMMENT_MANGA, {
        variables: {
            mangaId: manga.id,
        },
        fetchPolicy: "network-only",
        onError: () => {},
    });

    if (loading || addCommentResult.loading) return <Loading />;
    if (error || (!loading && !data))
        return (
            <ElementWrapper className="p-3">
                <Alert
                    message="Something went wrong! Please try again later"
                    className="mt-0 p-2"
                    fontSize="16px"
                />
            </ElementWrapper>
        );

    return (
        <>
            <ElementWrapper className="py-2">
                <h5 className="py-2">
                    <Icon
                        icon="comments"
                        style={{ fontSize: "1.2rem" }}
                        className="align-self-center me-2"
                    />
                    Post a Comment!
                </h5>
                {!user ? (
                    <Info
                        message={
                            <>
                                Please <Link to="/login">login</Link> to post a
                                comment
                            </>
                        }
                        className="mt-0 p-2"
                        fontSize="16px"
                    />
                ) : (
                    <form
                        className="input-group px-4 pb-2 comment-form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            addComment();
                        }}
                    >
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Post a comment..."
                            rows="1"
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                        />
                        <button
                            className="btn btn-info"
                            type="submit"
                            style={{ color: "white" }}
                            disabled={comment.trim() === ""}
                        >
                            <Icon
                                icon="comment"
                                style={{ fontSize: "1.2rem" }}
                                className="align-self-center me-2"
                            />
                            <b>Comment</b>
                        </button>
                    </form>
                )}
            </ElementWrapper>
            {data.listCommentsByMangaId.length === 0 ? (
                <ElementWrapper className="py-3">
                    <Info
                        message="This post don't have any comment"
                        className="mt-0 p-2"
                        fontSize="16px"
                    />
                </ElementWrapper>
            ) : (
                <ElementWrapper className="py-3 px-4">
                    {data.listCommentsByMangaId.map((comment) => (
                        <div
                            className="w-100 d-flex flex-row justify-content-start align-items-start mt-2"
                            key={comment.id}
                        >
                            <div
                                className="thumbnail rounded-circle"
                                style={{
                                    height: 50,
                                    width: 50,
                                    cursor: "pointer",
                                    backgroundImage: `url(${comment.user.avatar})`,
                                    backgroundPosition: "center center",
                                    backgroundSize: "cover",
                                }}
                            ></div>
                            <div className="ps-3 w-100">
                                <div className="w-100 d-flex flex-row justify-content-between">
                                    <div>
                                        <h6 className="d-inline-block pe-2">
                                            <b>{comment.user.username}</b>
                                        </h6>
                                        <time style={{ opacity: "0.6" }}>
                                            {moment(
                                                comment.createdAt
                                            ).fromNow()}
                                        </time>
                                    </div>
                                    <ReportForm
                                        Component={
                                            <Icon
                                                icon="flag"
                                                className="align-self-center"
                                            />
                                        }
                                        comment={comment}
                                        user={user}
                                    />
                                </div>
                                <p className="p-0">{comment.body}</p>
                            </div>
                        </div>
                    ))}
                </ElementWrapper>
            )}
        </>
    );
};

export default GalleryComment;
