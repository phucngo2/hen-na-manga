import React from "react";
import Icon from "./Icon";

const Verify = ({ message, className = "" }) => {
    if (!message) {
        return <></>;
    }

    return (
        <div
            className={`alert alert-success p-1 my-1 ${className}`}
            style={{ fontSize: 12 }}
        >
            <Icon icon="check-circle" className="align-self-center me-1" />
            {message}
        </div>
    );
};

export default Verify;
