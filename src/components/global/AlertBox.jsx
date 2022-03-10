import styled from "styled-components";
import cancelIcon from "assets/icons/close_white.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "features/alert/alertSlice";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 36px;
  grid-gap: 16px;
  padding: 16px;
  border-radius: 4px;
  background-color: var(--title-active);
  position: fixed;
  z-index: 23456;
  top: 108px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 327px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease-out;

  &.show {
    opacity: 1;
    pointer-events: all;
  }

  &.dashboard {
    transform: translateX(-50%);
  }

  .cancel {
    .icon {
      height: 20px;
    }
  }
`;

const AlertBox = ({ className }) => {
  const alertMsg = useSelector((state) => state.alert.msg);
  const dispatch = useDispatch();

  return (
    <Wrapper
      className={`${className ?? ""}${
        alertMsg ? " show" : " hide"
      } alertBox flexRow alignCenter`}
    >
      <span className="body-3 colorWhite">{alertMsg}</span>
      <button
        type="button"
        className="cancel"
        onClick={() => dispatch(clearAlert())}
      >
        <img src={cancelIcon} alt="check danger" className="icon" />
      </button>
    </Wrapper>
  );
};

export default AlertBox;
