import moment from "moment";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { Modal, Button } from "react-bootstrap";
import Icon from "../shared/Icon";
import { FLAG_COMMENT } from "../../utils/graphql/comment";
import Alert from "../shared/Alert";
import Info from "../shared/Info";

const ReportForm = ({ Component, comment, user }) => {
    // Handle Modal Show
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (!user) return;
        setShow(true);
    };

    // Handle Input
    const [input, setInput] = useState("");

    const handleInput = (event) => {
        setInput(event.target.value);
    };

    // Flag Comment
    const [flagComment, { loading, data, error }] = useMutation(FLAG_COMMENT, {
        onError: () => {},
    });

    const callDelete = () => {
        flagComment({
            variables: {
                commentId: comment.id,
                body: input,
            },
        });
    };

    return (
        <>
            <div onClick={handleShow}>{Component}</div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Report</Modal.Title>
                </Modal.Header>
                {loading ? (
                    <Modal.Body>
                        <div className="text-center">
                            <h4>Loading...</h4>
                            <div className="spinner-border text-info"></div>
                        </div>
                    </Modal.Body>
                ) : (
                    <>
                        <Modal.Body>
                            {error && <Alert message={error.message} />}
                            {data ? (
                                <Info message={data.flagComment} />
                            ) : (
                                <>
                                    <div className="w-100 d-flex flex-row justify-content-start align-items-start my-2">
                                        <div
                                            className="thumbnail rounded-circle"
                                            style={{
                                                height: 50,
                                                width: 50,
                                                cursor: "pointer",
                                                backgroundImage: `url(${comment.user.avatar})`,
                                                backgroundPosition:
                                                    "center center",
                                                backgroundSize: "cover",
                                            }}
                                        ></div>
                                        <div className="ps-3 w-100">
                                            <div className="w-100 d-flex flex-row justify-content-between">
                                                <div>
                                                    <h6 className="d-inline-block pe-2">
                                                        <b>
                                                            {
                                                                comment.user
                                                                    .username
                                                            }
                                                        </b>
                                                    </h6>
                                                    <time
                                                        style={{
                                                            opacity: "0.6",
                                                        }}
                                                    >
                                                        {moment(
                                                            comment.createdAt
                                                        ).fromNow()}
                                                    </time>
                                                </div>
                                            </div>
                                            <p className="p-0">
                                                {comment.body}
                                            </p>
                                        </div>
                                    </div>
                                    <form>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter information..."
                                            onChange={handleInput}
                                            value={input}
                                        ></textarea>
                                    </form>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            {data ? (
                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={callDelete}
                                    >
                                        <Icon
                                            icon="flag"
                                            style={{
                                                color: "white",
                                            }}
                                            className="align-self-center"
                                        />
                                        <span className="ps-2">Report</span>
                                    </Button>
                                </>
                            )}
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </>
    );
};

export default ReportForm;
