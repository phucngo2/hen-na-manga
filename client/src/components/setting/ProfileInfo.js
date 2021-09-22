import React from "react";

import CustomedModal from "../shared/Modal";
import InputBox from "../shared/InputBox";
import { useForm } from "../../utils/hooks";
import Icon from "../shared/Icon";
import { EMAIL } from "../../utils/constants";
import Verify from "../shared/Verify";
import Alert from "../shared/Alert";

const ProfileInfo = ({
    userInfo,
    updateProfile,
    userId,
    updateResult,
    deleteUser,
}) => {
    const validate = {
        email: EMAIL,
    };

    const initialState = {
        email: userInfo.email || "",
    };

    const { values, errors, onChange, onSubmit } = useForm(
        handleSubmit,
        initialState,
        validate
    );

    // Form submit
    function handleSubmit() {
        updateProfile({
            variables: {
                userId,
                email: values.email,
            },
        });
    }

    return (
        <form className="w-100 p-3" onSubmit={onSubmit}>
            <InputBox
                label="Email"
                name="email"
                className="w-100 pt-3 pb-2"
                value={values.email}
                onChange={onChange}
                validateMessage={errors.email}
            />
            {updateResult.error && (
                <Alert message={updateResult.error.message} className="mt-0" />
            )}
            {updateResult.data && (
                <Verify
                    message={updateResult.data.updateProfile}
                    className="mt-0"
                />
            )}
            <div className="d-flex flex-row justify-content-between my-3">
                <button
                    type="submit"
                    className="btn btn-info d-flex justify-content-center align-items-center"
                    style={{ color: "white" }}
                >
                    <Icon
                        icon="edit"
                        style={{ color: "white", fontSize: "1.2rem" }}
                        className="align-self-center"
                    />
                    <b className="ps-2">Edit</b>
                </button>
                <CustomedModal
                    Component={
                        <button
                            className="btn btn-danger d-flex justify-content-center align-items-center"
                            style={{ color: "white" }}
                            onClick={(event) => event.preventDefault()}
                        >
                            <Icon
                                icon="trash-alt"
                                style={{
                                    color: "white",
                                    fontSize: "1.2rem",
                                }}
                                className="align-self-center"
                            />
                            <b className="ps-2">Delete Account</b>
                        </button>
                    }
                    header="Warning"
                    content="Are you want to delete?"
                    handleDelete={deleteUser}
                />
            </div>
        </form>
    );
};

export default ProfileInfo;
