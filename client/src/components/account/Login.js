import React from "react";
import "./Login.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import md5 from "md5";

import PageWrapper from "../shared/PageWrapper";
import ElementWrapper from "../shared/ElementWrapper";
import Icon from "../shared/Icon";
import { useForm } from "../../utils/hooks";
import { REQUIRED, tags } from "../../utils/constants";
import InputBox from "../shared/InputBox";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/graphql/auth";
import Loading from "../shared/Loading";
import Alert from "../shared/Alert";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";

const Login = () => {
    const location = useLocation();

    const { values, errors, onChange, onSubmit } = useForm(
        handleSubmit,
        initialState,
        validate
    );

    const dispatch = useDispatch();
    const history = useHistory();
    const [signin, { loading, error }] = useMutation(LOGIN, {
        onCompleted: (data) => {
            dispatch(login(data.login));
            history.push("/");
        },
        onError: () => {},
    });

    function handleSubmit() {
        signin({
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
                <Icon icon="sign-in-alt" className="align-self-center me-3" />
                Login
            </h2>
            {location.state && (
                <h6 className="pb-2">{location.state.message}</h6>
            )}
            <ElementWrapper className="form-wrapper pt-3 pb-1">
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
                    <div className="form-check py-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="remember"
                        />
                        <label className="form-check-label" htmlFor="remember">
                            Remember me!
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-info d-flex justify-content-center align-items-center"
                        style={{ color: "white" }}
                    >
                        <Icon
                            icon="sign-in-alt"
                            style={{ color: "white", fontSize: "1.2rem" }}
                            className="align-self-center"
                        />
                        <b className="ps-2">Login</b>
                    </button>
                    <p className="form-text mt-4">
                        Forgot password?{" "}
                        <Link to="/forgot">Recover password</Link>!
                    </p>
                    <p className="form-text">
                        Don't have account?{" "}
                        <Link to="/register">Register now</Link>!
                    </p>
                </form>
            </ElementWrapper>
        </PageWrapper>
    );
};

export default Login;

const validate = {
    username: REQUIRED,
    password: REQUIRED,
};

const initialState = {
    username: "",
    password: "",
};
