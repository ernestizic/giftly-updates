import Loader from "./Loader";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: ${(props) => props.height || "48px"};
  width: ${(props) => props.width ? props.width : props.fullWidth ? "100%" : "max-content"};
  background-color: ${(props) => props.bg || " var(--primary-main)"};
  color: ${(props) => props.color || "#ffffff"};
  font-family: var(--font_1-regular);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0rem;
  text-align: center;
  transition: all 0.2s ease-out;
  flex-shrink: 0;
  padding: 0 24px;
  white-space: nowrap;

  .icon {
    height: 20px;

    &.left {
      margin-right: 8px;
    }

    &.right {
      margin-left: 8px;
    }
  }

  // &:hover {
  //   background-color: var(--primary-dark);
  // }
  &.border_dark {
    border: 1px solid #121212;
    color: #121212;
    background: inherit;
  }
  &.secondary {
    background-color: var(--accent_2-main);
    color: var(--primary-main);

    &:hover {
      background-color: var(--primary-light);
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
