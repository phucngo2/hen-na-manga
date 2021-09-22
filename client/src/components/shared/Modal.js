import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import Icon from "./Icon";

const CustomedModal = ({
    Component,
    header,
    content,
    handleDelete = undefined,
}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const callDelete = () => {
        handleDelete();
        handleClose();
    };

    return (
        <>
            <div onClick={handleShow}>{Component}</div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{content}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* If have delte btn => show */}
                    {handleDelete ? (
                        <Button variant="danger" onClick={callDelete}>
                            <Icon
                                icon="trash-alt"
                                style={{
                                    color: "white",
                                }}
                                className="align-self-center"
                            />
                            <span className="ps-2">Delete</span>
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleClose}>
                            OK
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CustomedModal;
