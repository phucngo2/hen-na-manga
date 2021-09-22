import React from "react";
import md5 from "md5";

import SettingElementWrapper from "./SettingElementWrapper";
import Icon from "../shared/Icon";
import InputBox from "../shared/InputBox";
import { useForm } from "../../utils/hooks";
import { ACCOUNT, CONFIRMPWD, REQUIRED, tags } from "../../utils/constants";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PASSWORD } from "../../utils/graphql/user";
import Loading from "../shared/Loading";
import Alert from "../shared/Alert";
import Verify from "../shared/Verify";

const Password = ({ user }) => {
    const { values, errors, onChange, onSubmit } = useForm(
        handleSubmit,
        initialState,
        validate
    );

    const [updatePassword, { loading, data, error }] = useMutation(
        UPDATE_USER_PASSWORD,
        {
            onError: () => {},
        }
    );

    function handleSubmit() {
        updatePassword({
            variables: {
                userId: user.id,
                oldPassword: md5(values.oldPassword + tags[4]),
                password: md5(values.password + tags[4]),
            },
        });
    }

    if (loading) return <Loading />;

    return (
        <>
            <h2 className="p-3">
                <Icon icon="unlock-alt" className="align-self-center me-3" />
                Change Password
            </h2>
            <SettingElementWrapper className="form-wrapper">
                <form className="w-100 p-3" onSubmit={onSubmit}>
                    {error && (
                        <Alert message={error.message} className="mt-0" />
                    )}
                    {data && (
                        <Verify
                            message={data.updatePassword}
                            className="mt-0"
                        />
                    )}
                    <InputBox
                        label="Old Password"
                        name="oldPassword"
                        className="w-100 py-2"
                        value={values.oldPassword}
                        onChange={onChange}
                        validateMessage={errors.oldPassword}
                    />
                    <InputBox
                        label="New Password"
                        name="password"
                        className="w-100 py-2"
                        value={values.password}
                        onChange={onChange}
                        validateMessage={errors.password}
                    />
                    <InputBox
                        label="Confirm Password"
                        name="confirmPassword"
                        className="w-100 py-2"
                        value={values.confirmPassword}
                        onChange={onChange}
                        validateMessage={errors.confirmPassword}
                    />
                    <button
                        type="submit"
                        className="btn btn-info d-flex justify-content-center align-items-center my-3"
                        style={{ color: "white" }}
                    >
                        <Icon
                            icon="edit"
                            style={{ color: "white", fontSize: "1.2rem" }}
                            className="align-self-center"
                        />
                        <b className="ps-2">Edit</b>
                    </button>
                </form>
            </SettingElementWrapper>
        </>
    );
};

export default Password;
const validate = {
    oldPassword: REQUIRED,
    password: ACCOUNT,
    confirmPassword: CONFIRMPWD,
};

const initialState = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
};
