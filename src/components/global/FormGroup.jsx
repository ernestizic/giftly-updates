import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import eyeIcon from "assets/icons/eye.svg";
import eyeClosed from "assets/icons/eye_slash.svg";
import { useField } from "formik";
import { useState } from "react";
import { useEffect } from "react";

export const FormGroupWrapper = styled.div`
  .fieldWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: .8rem;
    height: ${(props) => (props.fieldStyle === "longText" ? "auto" : "5.6rem")};
    position: relative;
    background-color: ${(props) => props.bg ?? "var(--input-bg)"};

    &.error {
      border: .1rem solid var(--error-default);
    }
  }

  input,
  textarea,
  select {
    display: block;
    color: ${(props) => props.color ?? "var(--title-active)"};
    width: 100%;
    padding: 0 2.4rem;
    background-color: transparent;
    border: none;
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-style: normal;
    font-weight: 400;

    &::placeholder {
      color: var(--placeholder);
    }
  }

  select {
    cursor: pointer;
    color: #6e7191;
  }

  .toggleShow {
    display: none;
  }

  &.password {
    input,
    textarea {
      width: calc(100% - 2.4rem);
    }

    .toggleShow {
      display: inline;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 1.5rem;
      height: 2rem;
    }
  }

  textarea {
    height: 14.4rem;
    padding: 1.5rem;
  }

  .dropdownIcon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.5rem;
    pointer-events: none;
  }

  .errorText {
    display: block;
    width: 100%;
    text-align: left;
    margin-top: 0.6rem;
    color: var(--error-default);
  }
`;

export const FormGroupLabel = styled.label`
  display: block;
  color: var(--label);
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.8rem;
  text-align: left;
  margin-top: .6rem;
  margin-left: 2.4rem;
`;

const handleToggleShowPassword = (id) => {
  const field = document.querySelector(`#${id}`);

  if (field.type === "password") {
    field.type = "text";
  } else {
    field.type = "password";
  }
};

const FormGroup = ({
  className,
  fieldStyle,
  type = "text",
  name,
  value,
  label,
  required = true,
  defaultValue,
  color,
  onChange,
  ...props
}) => {
  const [field, meta] = useField({ ...props, name });
  const [showPassword, setShowPassword] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const toggleLabel = (e) => {
    if (e.target.value) {
      setShowLabel(true);
    } else {
      setShowLabel(false);
    }
  };

  useEffect(() => {
    if (defaultValue?.length || defaultValue !== undefined || value) {
      setShowLabel(true);
    }
    // eslint-disable-next-line
  }, [defaultValue, value]);

  useEffect(() => {
    document.querySelectorAll(`input`).forEach((input) => {
      input.addEventListener("mousewheel", function (e) {
        e.target.blur();
      });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <FormGroupWrapper className={className} fieldStyle={fieldStyle}>
        <div
          className={`fieldWrapper${
            meta.touched && meta.error ? " error" : ""
          }`}
        >
          {label && showLabel && (
            <FormGroupLabel htmlFor={name}>{label}</FormGroupLabel>
          )}
          {fieldStyle === "shortText" && (
            <>
              <input
                {...field}
                className="textSmall"
                id={name}
                type={type}
                defaultValue={defaultValue}
                onChange={(e) => {
                  onChange && onChange(e);
                  toggleLabel(e);
                  field.onChange(e);
                }}
                onBlur={(e) => {
                  toggleLabel(e);
                  field.onBlur(e);
                }}
                value={value || field.value}
                {...props}
                autoComplete="off"
                placeholder={label}
              />
              {type === "password" && (
                <img
                  src={showPassword ? eyeClosed : eyeIcon}
                  alt="eye"
                  className="toggleShow cursorPointer"
                  onClick={(e) => {
                    setShowPassword((prev) => !prev);
                    handleToggleShowPassword(name);
                  }}
                />
              )}
            </>
          )}
          {fieldStyle === "longText" && (
            <>
              <textarea
                className="textSmall"
                id={name}
                name={name}
                required={required}
                defaultValue={defaultValue}
                {...field}
                {...props}
                autoComplete="off"
              />
            </>
          )}
        </div>
        {meta.touched && meta.error && (
          <span className="textDescription colorDanger errorText">
            {meta.error}
          </span>
        )}
      </FormGroupWrapper>
    </>
  );
};

FormGroup.propTypes = {
  className: PropTypes.string,
  fieldStyle: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  color: PropTypes.string,
  rowIndex: PropTypes.number,
};

export default FormGroup;
