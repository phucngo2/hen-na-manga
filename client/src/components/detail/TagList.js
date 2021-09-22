// Libs
import React from "react";
import { Link } from "react-router-dom";

const TagList = ({ tagList }) => {
    return (
        <h6 className="txt-15">
            Tags:
            {tagList.map((tag) => (
                <Link
                    key={tag}
                    to={{
                        pathname: "/search",
                        state: { tag: tag },
                    }}
                    className="d-inline-block color-trans btn-tag p-1 rounded m-1"
                >
                    {tag}
                </Link>
            ))}
        </h6>
    );
};

export default TagList;
