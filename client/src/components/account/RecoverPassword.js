import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import md5 from "md5";

import PageWrapper from "../shared/PageWrapper";
import ElementWrapper from "../shared/ElementWrapper";
import Icon from "../shared/Icon";
import { RECOVER_PASSWORD, VERIFY_RESET_TOKEN } from "../../utils/graphql/user";
import Loading from "../shared/Loading";
import Alert from "../shared/Alert";
import { ACCOUNT, CONFIRMPWD, tags } from "../../utils/constants";
import { useForm } from "../../utils/hooks";
import InputBox from "../shared/InputBox";
import Verify from "../shared/Verify";

const ForgotPassword = () => {
    const pathnameArr = window.location.pathname.split("/");
    const resetToken = pathnameArr[pathnameArr.length - 1];

    // Verify reset token
    const verifyResetResult = useQuery(VERIFY_RESET_TOKEN, {
        variables: {
            resetToken,
        },
    });

    // Password Form
    const { values, errors, onChange, onSubmit } = useForm(
        handleSubmit,
        initialState,
        validate
    );

    // Recover Password Mutation
    const [recoverPassword, recoverResult] = useMutation(RECOVER_PASSWORD, {
        onError: () => {},
    });

    function handleSubmit() {
        recoverPassword({
            variables: {
                resetToken,
                password: md5(values.password + tags[4]),
            },
        });
    }

    // Loading
    if (verifyResetResult.loading || recoverResult.loading) return <Loading />;
    if (verifyResetResult.error || recoverResult.error)
        return (
            <PageWrapper>
                <h2 className="p-3">
                    Sorry, we cannot recover your account 😭!
                </h2>
                <Alert
                    message={verifyResetResult.error.message}
                    className="p-2"
                />
            </PageWrapper>
        );

    if (recoverResult.data)
        return (
            <PageWrapper>
                <h2 className="p-3">Done 😉!</h2>
                <Verify
                    message={recoverResult.data.recoverPassword}
                    className="p-2"
                />
            </PageWrapper>
        );

    return (
        <PageWrapper className="">
            <h2 className="p-3">
                <Icon icon="edit" className="align-self-center me-3" />
                Recover Password
            </h2>
            <ElementWrapper className="form-wrapper">
                <form className="w-100 p-3" onSubmit={onSubmit}>
                    <InputBox
                        label="New Password"
                        name="password"
                        className="w-100 py-3"
                        value={values.password}
                        onChange={onChange}
                        validateMessage={errors.password}
                    />
                    <InputBox
                        label="Confirm Password"
                        name="confirmPassword"
                        className="w-100 py-3"
                        value={values.confirmPassword}
                        onChange={onChange}
                        validateMessage={errors.confirmPassword}
                    />
                    <button
                        type="submit"
                        className="btn btn-success d-flex justify-content-center align-items-center float-end"
                        style={{ color: "white" }}
                    >
                        <Icon
                            icon="edit"
                            style={{ color: "white", fontSize: "1.2rem" }}
                            className="align-self-center"
                        />
                        <b className="ps-2">Submit</b>
                    </button>
                </form>
            </ElementWrapper>
        </PageWrapper>
    );
};

export default ForgotPassword;

const validate = {
    password: ACCOUNT,
    confirmPassword: CONFIRMPWD,
};

const initialState = {
    password: "",
    confirmPassword: "",
};
