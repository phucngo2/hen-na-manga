// Libs
import React from "react";

const PageWrapper = ({ children, className }) => {
    return (
        <div
            className={`page-wrapper container-fluid d-flex flex-column align-items-center ${className}`}
            style={{ width: "100vw" }}
        >
            {children}
        </div>
    );
};

export default PageWrapper;
