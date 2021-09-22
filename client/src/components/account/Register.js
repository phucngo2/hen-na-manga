import React from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import md5 from "md5";

import PageWrapper from "../shared/PageWrapper";
import ElementWrapper from "../shared/ElementWrapper";
import Icon from "../shared/Icon";
import InputBox from "../shared/InputBox";
import { useForm } from "../../utils/hooks";
import { ACCOUNT, CONFIRMPWD, tags } from "../../utils/constants";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../utils/graphql/auth";
import Loading from "../shared/Loading";
import Alert from "../shared/Alert";

const Register = () => {
    const { values, errors, onChange, onSubmit } = useForm(
        handleSubmit,
        initialState,
        validate
    );

    const history = useHistory();
    const [register, { loading, error }] = useMutation(REGISTER, {
        onCompleted: () => {
            history.push({
                pathname: "/login",
                state: {
                    message: "Registered successfully! Now you can Login!",
                },
            });
        },
        onError: () => {},
    });

    function handleSubmit() {
        register({
            variables: {
                username: values.username,
                password: md5(values.password + tags[4]),
            },
        });
    }

    if (loading) return <Loading />;

    return (
        <PageWrapper className="">
            <h2 className="p-3">
                <Icon icon="edit" className="align-self-center me-3" />
                Register
            </h2>
            <ElementWrapper className="form-wrapper pt-3">
                <form className="w-100 px-3" onSubmit={onSubmit}>
                    {error && (
                        <Alert
                            message={error.message}
                            className="w-100 p-2 mt-2 mb-2"
                        />
                    )}
                    <InputBox
                        label="Username"
                        name="username"
                        className="w-100 py-2"
                        value={values.username}
                        onChange={onChange}
                        validateMessage={errors.username}
                    />
                    <InputBox
                        label="Password"
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
                    <div className="form-check py-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="agree"
                        />
                        <label className="form-check-label" htmlFor="agree">
                            I agree with Terms and Conditions!
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success d-flex justify-content-center align-items-center"
                        style={{ color: "white" }}
                    >
                        <Icon
                            icon="edit"
                            style={{ color: "white", fontSize: "1.2rem" }}
                            className="align-self-center"
                        />
                        <b className="ps-2">Register</b>
                    </button>
                    <p className="form-text mt-3">
                        Already have account? <Link to="/login">Login now</Link>
                        !
                    </p>
                </form>
            </ElementWrapper>
        </PageWrapper>
    );
};

export default Register;

const validate = {
    username: ACCOUNT,
    password: ACCOUNT,
    confirmPassword: CONFIRMPWD,
};

const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
};
