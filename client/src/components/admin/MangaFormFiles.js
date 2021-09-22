import React from "react";

import SettingElementWrapper from "../setting/SettingElementWrapper";
import Alert from "../shared/Alert";

const MangaFormFiles = ({ isValid, setIsValid, setFiles }) => {
    const handleFilesChange = (event) => {
        if (event.target.files.length === 0) {
            return;
        }

        // Validate
        for (var file of event.target.files) {
            if (
                !file.name.match(/\.(jpg|jpeg|png|jfif)$/) ||
                file.size > 5242880
            ) {
                return setIsValid(false);
            }
        }

        setFiles(event.target.files);
        setIsValid(true);
    };

    return (
        <SettingElementWrapper className="px-3 pb-1 manga-form-width">
            <div className="py-2">
                <label htmlFor="files" className="form-label">
                    Pages* (Upload a folder here)
                </label>
                <input
                    className={
                        isValid ? "form-control" : "form-control is-invalid"
                    }
                    type="file"
                    id="files"
                    webkitdirectory=""
                    mozdirectory=""
                    onChange={handleFilesChange}
                />
            </div>
            {!isValid && (
                <Alert
                    message="Your files are too powerful! Please upload images that less
                than 5MB!"
                    className="mb-2"
                />
            )}
        </SettingElementWrapper>
    );
};

export default MangaFormFiles;
