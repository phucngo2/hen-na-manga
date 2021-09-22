import React, { useRef, useState } from "react";

import Alert from "../shared/Alert";

const ProfileAvatar = ({ userAvatar, updateAvatar, userId }) => {
    const [isFilesValid, setIsFilesValid] = useState(true);

    // Handle upload avatar
    const avatarInput = useRef(null);
    // Toggle avatar input when click to the image
    const showOpenFile = () => {
        if (avatarInput) {
            avatarInput.current.click();
        }
    };

    const handleUploadImage = (event) => {
        if (event.target.files.length === 0) {
            return;
        }

        const file = event.target.files[0];

        if (
            !file.name.match(/\.(jpg|jpeg|png|jfif)$/) ||
            file.size > 2 * 1024 * 1024
        ) {
            return setIsFilesValid(false);
        }

        updateAvatar({
            variables: {
                userId: userId,
                avatar: file,
            },
        });
        setIsFilesValid(true);
    };

    return (
        <div className="w-100 p-3 pb-0 d-flex flex-column align-items-center justify-content-center">
            <label className="form-label w-100" htmlFor="avatar">
                Avatar
            </label>
            <div
                className="rounded-circle"
                style={{
                    width: 100,
                    height: 100,
                    cursor: "pointer",
                    backgroundImage: `url(${userAvatar})`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                }}
                onClick={showOpenFile}
            ></div>
            {!isFilesValid && (
                <Alert
                    message="Your file are too powerful! Please upload images that less
                than 2MB!"
                    className="mt-3 mb-0"
                />
            )}
            <input
                ref={avatarInput}
                onChange={handleUploadImage}
                type="file"
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                id="avatar"
            />
        </div>
    );
};

export default ProfileAvatar;
