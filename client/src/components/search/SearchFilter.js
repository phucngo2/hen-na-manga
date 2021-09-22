// Libs
import React from "react";
import Icon from "../shared/Icon";

const SearchFilter = ({ filter, setFilter }) => {
    return (
        <div className="w-100 d-flex flex-row justify-content-center align-items-center py-2">
            <span>
                <Icon
                    icon="filter"
                    style={{ fontSize: "1.2rem" }}
                    className="align-self-center"
                />
                <b className="ps-2">Filter | </b>
            </span>
            <div className="w-search-option">
                <select
                    className="form-select w-100"
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                >
                    <option value="Latest">Latest</option>
                    <option value="AtoZ">A to Z</option>
                    <option value="ZtoA">Z to A</option>
                    <option value="Popular">Most Popular</option>
                    <option value="Favorite">Most Favorite</option>
                </select>
            </div>
        </div>
    );
};

export default SearchFilter;
