import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 48px;
  width: ${(props) => props.width ?? "200px"};
  padding: 0 36px;
  background-color: var(--primary-main);
  color: #ffffff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;

  .icon {
    height: 2rem;
    margin-right: 1.2rem;
  }

  &:hover {
    background-color: var(--primary-dark);
  }

  &:focus {
    border: 8px solid #fcd4e5;
  }

  &:disabled {
    opacity: 0.5;
  }

  &.bordered {
    border: 1px solid #01a3fa;
    color: #01a3fa;
    background-color: transparent;
  }

  &.borderedPrimary {
    border: 1px solid var(--primary);
    color: var(--primary);
    background-color: transparent;
  }

  &.borderedGrey {
    border: 1px solid var(--body_text);
    color: var(--body_text);
    background-color: transparent;
  }

  &.noBorder {
    border: none;
    color: var(--primary);
    background-color: transparent;
  }
`;

const Button = ({
  className,
  bg,
  type,
  height,
  fullWidth,
  width,
  text,
  disabled,
  color,
  icon,
  endIcon,
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
  return (
    <Wrapper {...styleProps}>
      {icon && !disabled && <img src={icon} alt="icon" className="icon" />}
      <span>{text}</span>
      {endIcon && <img src={endIcon} alt="endIcon" className="endIcon" />}
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
};

export default Button;
