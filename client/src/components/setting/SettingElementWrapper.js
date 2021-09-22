import React from "react";

const SettingElementWrapper = ({ children, className }) => {
    return (
        <div
            className={`element-wrapper d-flex flex-column align-items-center justify-content-center rounded my-1 px-2 ${className}`}
        >
            {children}
        </div>
    );
};

export default SettingElementWrapper;
