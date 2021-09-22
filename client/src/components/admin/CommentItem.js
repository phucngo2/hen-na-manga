import { useApolloClient, useMutation } from "@apollo/client";
import moment from "moment";
import React from "react";

import { DELETE_COMMENT, UNFLAG_COMMENT } from "../../utils/graphql/comment";
import Icon from "../shared/Icon";

const CommentItem = ({ comment }) => {
    const client = useApolloClient();
    const [unflagComment] = useMutation(UNFLAG_COMMENT, {
        variables: {
            commentId: comment.id,
        },
        onCompleted: async () => {
            await client.refetchQueries({
                updateCache(cache) {
                    cache.evict({ fieldName: "listFlaggedComments" });
                    cache.gc();
                },
            });
        },
        onError: () => {},
    });

    const [removeComment] = useMutation(DELETE_COMMENT, {
        variables: {
            commentId: comment.id,
        },
        onCompleted: async () => {
            await client.refetchQueries({
                updateCache(cache) {
                    cache.evict({ fieldName: "listFlaggedComments" });
                    cache.gc();
                },
            });
        },
        onError: () => {},
    });

    return (
        <div className="w-100 d-flex flex-column justify-content-start align-items-start my-2 rounded py-3 px-2">
            <div className="w-100">
                <div className="w-100 d-flex flex-row justify-content-between">
                    <div>
                        <h6 className="d-inline-block pe-2">
                            <b>{comment.user.username}</b>
                        </h6>
                        <span className="pe-2">
                            commented on <b>{comment.manga.name}</b>
                        </span>
                        <time style={{ opacity: "0.6" }}>
                            {moment(comment.createdAt).fromNow()}
                        </time>
                    </div>
                    <div style={{ width: 130 }}>
                        <button
                            className="btn btn-secondary me-md-2"
                            style={{ width: 40, height: 40 }}
                            onClick={unflagComment}
                        >
                            <Icon
                                icon="times"
                                style={{
                                    color: "white",
                                }}
                                className="align-self-center"
                            />
                        </button>
                        <button
                            className="btn btn-danger"
                            style={{ width: 40, height: 40 }}
                            onClick={removeComment}
                        >
                            <Icon
                                icon="trash"
                                style={{
                                    color: "white",
                                }}
                                className="align-self-center"
                            />
                        </button>
                    </div>
                </div>
                <p className="py-2 py-md-0">{comment.body}</p>
            </div>
            {comment.flags.map((flag) => {
                index++;

                return (
                    <div
                        className="p-2 pb-0 mb-2 alert alert-danger border-danger"
                        key={`${flag.username} ${index}`}
                    >
                        <h6>
                            <b>{flag.username}</b>
                            <span style={{ opacity: "0.6" }}>
                                {` - ${moment(flag.createdAt).fromNow()}`}
                            </span>
                        </h6>
                        <p>{flag.body}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default CommentItem;

var index = 0;
