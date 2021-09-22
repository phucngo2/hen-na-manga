import React from "react";
import Icon from "./Icon";

const Info = ({ message, className = "", fontSize = 12 }) => {
    if (!message) {
        return <></>;
    }

    return (
        <div
            className={`alert alert-info p-1 my-1 ${className}`}
            style={{ fontSize: fontSize }}
        >
            <Icon icon="info-circle" className="align-self-center me-2" />
            {message}
        </div>
    );
};

export default Info;
