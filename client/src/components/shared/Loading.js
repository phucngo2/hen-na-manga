import React from "react";

const Loading = () => {
    return (
        <div
            className="text-center"
            style={{
                paddingTop: "6rem",
                minHeight: "100vh",
            }}
        >
            <h4>Loading...</h4>
            <div className="spinner-border text-info"></div>
        </div>
    );
};

export default Loading;
