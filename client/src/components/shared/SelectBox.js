import React from "react";
import Alert from "./Alert";

const SelectBox = ({
    label,
    name,
    value,
    onChange,
    optionList,
    validateMessage = "",
    className = "",
}) => {
    return (
        <div className={className}>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                id={name}
                className={
                    validateMessage.length === 0
                        ? "form-select"
                        : "form-select is-invalid"
                }
                name={name}
                value={value}
                onChange={onChange}
            >
                <option value=""></option>
                {optionList.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
            <Alert message={validateMessage} />
        </div>
    );
};

export default SelectBox;
