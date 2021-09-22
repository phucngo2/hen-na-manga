import React from "react";
import Icon from "./Icon";

const Alert = ({ message, className = "" }) => {
    if (!message) {
        return <></>;
    }

    return (
        <div
            className={`alert alert-danger p-1 my-1 ${className}`}
            style={{ fontSize: 12 }}
        >
            <Icon
                icon="exclamation-triangle"
                className="align-self-center me-1"
            />
            {message}
        </div>
    );
};

export default Alert;
