import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  label {
    margin-left: 1.2rem;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 20px;
  width: 20px;
  border: ${(props) =>
    props.checked ? "2px solid var(--primary-main)" : "1px solid var(--line)"};
  border-radius: 50%;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: var(--primary-main);
    display: ${(props) => (props.checked ? "block" : "none")};
  }

  input {
    display: none;
  }

  .checkedIcon {
    height: 100%;
    pointer-events: none;
  }
`;

const RadioInput = ({
  id,
  className,
  name,
  grey,
  circle,
  label,
  value,
  required = false,
  checked = false,
  disabled,
  onClick,
}) => {
  return (
    <Wrapper className="flexRow alignCenter">
      <Box
        grey={grey}
        circle={circle}
        checked={checked}
        onClick={() => {
          onClick && onClick();
        }}
        className={className}
      >
        <input
          type="radio"
          name={name}
          id={`${id}`}
          value={value}
          required={required}
          disabled={disabled}
          onClick={() => {
            onClick && onClick();
          }}
        />
      </Box>
      {label && (
        <label htmlFor={`${id}`} className="subtitle-5">
          {label}
        </label>
      )}
    </Wrapper>
  );
};

RadioInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  grey: PropTypes.bool,
  circle: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default RadioInput;
