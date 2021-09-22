// Libs
import React from "react";

import ElementWrapper from "../shared/ElementWrapper";
import { tags, languages, categories } from "../../utils/constants";
import Icon from "../shared/Icon";
import InputBox from "../shared/InputBox";
import SelectBox from "../shared/SelectBox";

const SearchOptions = ({
    onSubmit,
    onChange,
    values,
    handleSelectTag,
    handleDeleteTag,
    selectedTags,
}) => {
    return (
        <ElementWrapper>
            <form
                className="w-100 py-2 d-flex flex-row justify-content-between flex-wrap"
                onSubmit={onSubmit}
            >
                <InputBox
                    label="Keyword"
                    name="keyword"
                    className="w-search-option"
                    value={values.keyword}
                    onChange={onChange}
                />
                <div className="w-search-option">
                    <label htmlFor="tag" className="form-label">
                        Tag
                    </label>
                    <select
                        id="tag"
                        className="form-select w-100"
                        defaultValue=""
                        onChange={handleSelectTag}
                    >
                        <option hidden disabled value=""></option>
                        {tags.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>
                <SelectBox
                    label="Category"
                    name="category"
                    value={values.category}
                    onChange={onChange}
                    optionList={categories}
                    className="w-search-option"
                />
                <SelectBox
                    label="Language"
                    name="language"
                    value={values.language}
                    onChange={onChange}
                    optionList={languages}
                    className="w-search-option"
                />
                <div className="w-search-btn d-flex flex-column justify-content-end mt-3 mt-md-0">
                    <button className="btn btn-info w-100">
                        <Icon
                            icon="search"
                            style={{ color: "white", fontSize: "1.2rem" }}
                            className="align-self-center"
                        />
                    </button>
                </div>
            </form>
            {selectedTags.length > 0 && (
                <div className="w-100 align-items-center px-1 px-md-2 pb-3 d-flex flex-row justify-content-start flex-wrap">
                    <span className="mx-1">
                        <Icon
                            icon="tags"
                            style={{ color: "white" }}
                            className="align-self-center"
                        />
                    </span>
                    {selectedTags.map((tag) => (
                        <span
                            key={`selected ${tag}`}
                            className="badge mx-1 my-1"
                            style={{ backgroundColor: "#88bef5", fontSize: 14 }}
                        >
                            <span className="pe-2">{tag}</span>
                            <Icon
                                icon="times"
                                style={{ color: "white" }}
                                className="align-self-center"
                                onClick={() => handleDeleteTag(tag)}
                            />
                        </span>
                    ))}
                </div>
            )}
        </ElementWrapper>
    );
};

export default SearchOptions;
