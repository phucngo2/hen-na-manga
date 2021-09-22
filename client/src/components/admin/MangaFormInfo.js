import React from "react";

import SettingElementWrapper from "../setting/SettingElementWrapper";
import { tags, languages, categories } from "../../utils/constants";
import InputBox from "../shared/InputBox";
import SelectBox from "../shared/SelectBox";
import Alert from "../shared/Alert";
import Icon from "../shared/Icon";

const MangaFormInfo = ({
    values,
    onChange,
    selectedTags,
    handleSelectTag,
    handleDeleteTag,
    errors,
    tagError,
}) => {
    return (
        <SettingElementWrapper className="px-3 manga-form-width">
            <div className="w-100 py-3 d-flex flex-row flex-wrap">
                <InputBox
                    label="Name*"
                    name="name"
                    value={values.name}
                    onChange={onChange}
                    validateMessage={errors.name}
                    className="manga-form-input"
                />
                <InputBox
                    label="Alias"
                    name="alias"
                    value={values.alias}
                    onChange={onChange}
                    disabled={values.name.trim() === ""}
                    className="manga-form-input"
                />
                <InputBox
                    label="Artist*"
                    name="artist"
                    value={values.artist}
                    onChange={onChange}
                    validateMessage={errors.artist}
                    className="manga-form-input"
                />
                <InputBox
                    label="Group"
                    name="group"
                    value={values.group}
                    onChange={onChange}
                    disabled={values.artist.trim() === ""}
                    className="manga-form-input"
                />
                <SelectBox
                    label="Language*"
                    name="language"
                    value={values.language}
                    onChange={onChange}
                    optionList={languages}
                    validateMessage={errors.language}
                    className="manga-form-select"
                />
                <SelectBox
                    label="Category*"
                    name="category"
                    value={values.category}
                    onChange={onChange}
                    optionList={categories}
                    validateMessage={errors.category}
                    className="manga-form-select"
                />
                <div className="manga-form-select">
                    <label htmlFor="tag" className="form-label">
                        Tag*
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
                    <Alert message={tagError} />
                </div>
                {selectedTags.length > 0 && (
                    <div className="w-100 align-items-center px-md-2 py-3 d-flex flex-row justify-content-start flex-wrap">
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
                                style={{
                                    backgroundColor: "#88bef5",
                                    fontSize: 14,
                                }}
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
            </div>
        </SettingElementWrapper>
    );
};

export default MangaFormInfo;
