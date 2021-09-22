import { useState } from "react";

import {
    REQUIRED,
    ACCOUNT,
    EMAIL,
    CONFIRMPWD,
    ACCOUNT_REGEX,
    EMAIL_REGEX,
} from "./constants";

export const useForm = (callBack, initialState = {}, validation = {}) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: "" });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        var newErrors = { ...errors };
        var isValid = true;
        for (let key in validation) {
            switch (validation[key]) {
                case ACCOUNT: {
                    if (!ACCOUNT_REGEX.test(values[key])) {
                        newErrors[
                            key
                        ] = `${key.toUpperCase()} length is between 6 to 32 and can only contains lowercase/uppercase alphabet characters, number and some special characters: !@#$%^&*`;
                        isValid = false;
                    } else {
                        newErrors[key] = "";
                    }
                    break;
                }

                case EMAIL: {
                    if (!EMAIL_REGEX.test(values[key])) {
                        newErrors[
                            key
                        ] = `Please input valid ${key.toUpperCase()}`;
                        isValid = false;
                    } else {
                        newErrors[key] = "";
                    }
                    break;
                }

                case REQUIRED: {
                    if (values[key].trim().length === 0) {
                        newErrors[key] = `${key.toUpperCase()} is required`;
                        isValid = false;
                    } else {
                        newErrors[key] = "";
                    }
                    break;
                }

                case CONFIRMPWD: {
                    if (values.confirmPassword !== values.password) {
                        newErrors.confirmPassword =
                            "Password and confirm password must match";
                        isValid = false;
                    } else {
                        newErrors.confirmPassword = "";
                    }
                    break;
                }

                default: {
                    newErrors[key] = "";
                }
            }
        }

        setErrors(newErrors);

        if (!isValid) {
            return;
        }

        callBack();
    };

    return {
        onChange,
        onSubmit,
        values,
        setValues,
        errors,
    };
};

export const useSelectTag = (initialTags = []) => {
    const [selectedTags, setSelectedTags] = useState(initialTags);

    const handleSelectTag = (event) => {
        if (selectedTags.includes(event.target.value)) {
            return;
        }
        setSelectedTags([...selectedTags, event.target.value]);
    };

    const handleDeleteTag = (deletedTag) => {
        setSelectedTags(selectedTags.filter((tag) => tag !== deletedTag));
    };

    return {
        selectedTags,
        setSelectedTags,
        handleSelectTag,
        handleDeleteTag,
    };
};
