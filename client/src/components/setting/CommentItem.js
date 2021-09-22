import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useApolloClient, useMutation } from "@apollo/client";

import Icon from "../shared/Icon";
import CustomedModal from "../shared/Modal";
import { DELETE_COMMENT } from "../../utils/graphql/comment";

const CommentItem = ({ comment }) => {
    const client = useApolloClient();
    const [deleteComment] = useMutation(DELETE_COMMENT, {
        onError: () => {},
        onCompleted: async () => {
            await client.refetchQueries({
                updateCache(cache) {
                    cache.evict({ fieldName: "listCommentsByUserId" });
                    cache.gc();
                },
            });
        },
    });

    return (
        <div className="w-100 d-flex flex-row justify-content-start align-items-start mt-2">
            <Link className="" to={`/g/${comment.manga.code}`}>
                <img
                    src={comment.manga.coverImgSrc}
                    className="rounded"
                    alt="Avatar"
                    style={{ width: "100px" }}
                />
            </Link>
            <div className="ps-3 w-100">
                <div className="w-100 d-flex flex-row justify-content-between">
                    <div>
                        <h6 className="d-inline-block pe-2">
                            <b>{comment.manga.name}</b>
                        </h6>
                        <time style={{ opacity: "0.6" }}>
                            {moment(comment.createdAt).fromNow()}
                        </time>
                    </div>
                    <CustomedModal
                        Component={
                            <Icon icon="trash" className="align-self-center" />
                        }
                        header="Warning!"
                        content="Are you sure want to delete?"
                        handleDelete={() =>
                            deleteComment({
                                variables: {
                                    commentId: comment.id,
                                },
                            })
                        }
                    />
                </div>
                <p className="p-0">{comment.body}</p>
            </div>
        </div>
    );
};

export default CommentItem;
