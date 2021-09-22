import React from "react";

import PageWrapper from "../shared/PageWrapper";
import ElementWrapper from "../shared/ElementWrapper";
import Icon from "../shared/Icon";
import { EMAIL } from "../../utils/constants";
import { useForm } from "../../utils/hooks";
import InputBox from "../shared/InputBox";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "../../utils/graphql/user";
import Loading from "../shared/Loading";
import Alert from "../shared/Alert";
import Verify from "../shared/Verify";

const ForgotPassword = () => {
    const { values, errors, onChange, onSubmit } = useForm(
        handleSubmit,
        initialState,
        validate
    );

    const [forgotPassword, { loading, data, error }] = useMutation(
        FORGOT_PASSWORD,
        {
            onError: () => {},
        }
    );

    function handleSubmit() {
        forgotPassword({
            variables: {
                email: values.email,
            },
        });
    }

    if (loading) return <Loading />;

    return (
        <PageWrapper className="">
            <h2 className="p-3">
                <Icon icon="question" className="align-self-center me-3" />
                Forgot Password
            </h2>
            <ElementWrapper className="form-wrapper">
                <form className="w-100 p-3" onSubmit={onSubmit}>
                    {error && (
                        <Alert message={error.message} className="mt-0" />
                    )}
                    {data && (
                        <Verify
                            message={data.forgotPassword}
                            className="mt-0"
                        />
                    )}
                    <InputBox
                        label="Enter your email to recover password"
                        name="email"
                        className="w-100 py-3"
                        value={values.email}
                        onChange={onChange}
                        validateMessage={errors.email}
                    />
                    <button
                        type="submit"
                        className="btn btn-info d-flex justify-content-center align-items-center float-end"
                        style={{ color: "white" }}
                        disabled={data}
                    >
                        <Icon
                            icon="forward"
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
    email: EMAIL,
};

const initialState = {
    email: "",
};
