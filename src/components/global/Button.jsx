import Loader from "./Loader";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: ${(props) => props.height || "56px"};
  width: ${(props) => props.width ? props.width : props.fullWidth ? "100%" : "max-content"};
  background-color: ${(props) => props.bg || " var(--primary-main)"};
  color: ${(props) => props.color || "#ffffff"};
  font-family: var(--font_3-regular);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0rem;
  text-align: center;
  transition: all 0.2s ease-out;
  flex-shrink: 0;
  padding: 0 24px;
  white-space: nowrap;
  &:hover {
    background: #9F1C52;
  }
  &:focus {
    box-shadow: 0px 16px 40px 5px rgba(213, 216, 223, 0.2);
    background: #EE2A7B;
    border: 4px solid #F694BD;
  }

  .icon {
    height: 20px;

    &.left {
      margin-right: 8px;
    }

    &.right {
      margin-left: 8px;
    }
  }

  &.border_dark {
    border: 1px solid #9B9B9B;
    color: #121212;
    background: inherit;
    font-weight: 500;
    font-size: 16px;
    &:hover {
      box-shadow: 0px 16px 40px 5px rgba(213, 216, 223, 0.2);
      background: #F7F7FC;
    }
    &:focus {
      border: 4px solid #121212;
      box-shadow: 0px 16px 40px 5px rgba(213, 216, 223, 0.2);
    }
  }
  &.secondary {
    font-weight: 500;
    font-size: 16px;
    border: 1px solid #9B9B9B;
    background-color: inherit;
    color: #121212;

    &:hover {
      box-shadow: 0px 16px 40px 5px rgba(213, 216, 223, 0.2);
      background: #F7F7FC;
    }
    &:focus {
      border: 4px solid #121212;
      box-shadow: 0px 16px 40px 5px rgba(213, 216, 223, 0.2);
    }
  }

  &.large {
    height: 64px;
    font-size: 18px;
    line-height: 28px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    &:hover {
      background: var(--primary-main);
    }
  }

  &.noBorder {
    border: none;
    color: var(--primary-main);
    background-color: transparent;

    &.white {
      color: #ffffff;
    }
  }

  &.inverted {
    background-color: #ffffff;
    color: var(--primary-main);

    &:hover {
      background-color: var(--primary-light);
    }
  }

  &.text-type {
    background: inherit;
    &:hover {
      background: inherit;
    }
  }

  @media screen and (max-width: 768px) {
    height: 48px;

    &.large {
      height: 48px;
      background-color: ${(props) => props.bg || " var(--primary-main)"};
      color: ${(props) => props.color || "#ffffff"};
      font-family: var(--font_1-regular);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    }
  }
`;

const Button = ({
  className,
  bg,
  type = "button",
  height,
  fullWidth,
  width,
  text,
  disabled,
  color,
  iconLeft,
  iconRight,
  as,
  href,
  onClick,
  loading,
}) => {
  const styleProps = {
    className,
    bg,
    type,
    height,
    fullWidth,
    width,
    text,
    disabled,
    color,
    as,
    href,
    onClick,
  };

  if (loading) {
    return (
      <Wrapper {...styleProps}>
        <Loader />
      </Wrapper>
    );
  }

  return (
    <Wrapper {...styleProps}>
      {iconLeft && <img src={iconLeft} alt="icon" className={`icon${iconLeft && text ? " left" : ""}`} />}
      {text && <span>{text}</span>}
      {iconRight && <img src={iconRight} alt="icon" className={`icon${iconLeft && text ? " right" : ""}`} />}
    </Wrapper>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  bg: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fullWidth: PropTypes.bool,
  icon: PropTypes.string,
  endIcon: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default Button;
