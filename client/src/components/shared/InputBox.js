import React from "react";
import Alert from "./Alert";

const InputBox = ({
    label,
    name,
    value,
    onChange,
    disabled = false,
    validateMessage = "",
    className = "",
}) => {
    return (
        <div className={className}>
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <input
                className={
                    validateMessage.length === 0
                        ? "form-control"
                        : "form-control is-invalid"
                }
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                type={
                    name.toLowerCase().endsWith("password")
                        ? "password"
                        : "text"
                }
            />
            <Alert message={validateMessage} />
        </div>
    );
};

export default InputBox;
