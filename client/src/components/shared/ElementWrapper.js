// Libs
import React from "react";

const ElementWrapper = ({ children, className }) => {
    return (
        <div
            className={`element-wrapper d-flex flex-column align-items-center justify-content-center rounded my-2 px-2 ${className}`}
        >
            {children}
        </div>
    );
};

export default ElementWrapper;
