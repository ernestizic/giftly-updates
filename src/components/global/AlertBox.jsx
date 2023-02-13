import styled from "styled-components";
import SuccessIcon from 'assets/icons/success-toast-icon.svg';
import WarningIcon from 'assets/icons/warning-toast-icon.svg';
import ErrorIcon from 'assets/icons/error-toast-icon.svg';
import infoIcon from 'assets/icons/primary-toast-icon.svg';
import cancelIcon from "assets/icons/close_white.svg";
import CancelIconRed from "assets/icons/close-square-red.svg"
import CancelIconBlue from "assets/icons/close-square-blue.svg"
import CancelIconGreen from "assets/icons/close-square-green.svg"
import CancelIconYellow from "assets/icons/close-square-yellow.svg"
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "features/alert/alertSlice";

const Wrapper = styled.div`
  position: fixed;
  z-index: 23456;
  top: 108px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease-out;
  
  & > div{
    font-weight: 500;
    font-size: 14px;
    color: #fff;
    background: var(--title-active);
    width: 327px;
    border-radius: 8px;
    padding: 16px;
    gap: 16px;
  }

  &.show {
    opacity: 1;
    pointer-events: all;
  }

  &.dashboard {
    transform: translateX(-50%);
  }

  img{
    width:25px;
    height: auto;
  }
  .cancel-icon {
    width: 22px;
  }

  .success {
    color: var(--success-default);
    background: var(--success-light);
  }
  .error {
    color: var(--error-default);
    background: var(--error-light);
  }
  .warning {
    color: var(--warning-default);
    background: var(--warning-light)
  }
  .info {
    color: var(--info-default);
    background: var(--info-light)
  }
`;

function getIcon(type) {
  if(type?.includes("success")) {
    return <img src={SuccessIcon} alt="alert type icon" />
  } else if(type?.includes("error")) {
    return <img src={ErrorIcon} alt="alert type icon" />
  } else if(type?.includes("warning")) {
    return <img src={WarningIcon} alt="alert type icon" />
  } else if(type?.includes("info")){
    return <img src={infoIcon} alt="alert type icon" />
  } else {
    return
  }
}

function getCancelIcon(type) {
  if(type?.includes("success")) {
    return <img src={CancelIconGreen} alt="cancel icon" className="cancel-icon" />
  } else if(type?.includes("error")) {
    return <img src={CancelIconRed} alt="cancel icon" className="cancel-icon"/>
  } else if(type?.includes("warning")) {
    return <img src={CancelIconYellow} alt="cancel icon" className="cancel-icon"/>
  } else if(type?.includes("info")){
    return <img src={CancelIconBlue} alt="cancel icon" className="cancel-icon"/>
  } else {
    return <img src={cancelIcon} alt="cancel icon" className="cancel-icon" />
  }
}
// ALERT TYPES ARE: success, error, warning, info
const AlertBox = ({ message, type }) => {
  const alertMsg = useSelector((state) => state.alert.msg);
  const dispatch = useDispatch();

  return (
    <Wrapper
      className={`${alertMsg ? " show" : " hide"}`}
    >
      <div className={`${type} flexRow alignCenter justifySpaceBetween`}>
        <div className="flexRow alignCenter" style={{gap: '8px'}}>
          {getIcon(type)}

          <span className={`${type}`}>{message}</span>
        </div>
        <button
          type="button"
          onClick={() => dispatch(clearAlert())}
        >
          {getCancelIcon(type)}
        </button>
      </div>
    </Wrapper>
  );
};

export default AlertBox;
