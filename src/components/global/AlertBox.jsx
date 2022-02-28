import styled from "styled-components";
import checkSuccessBadge from "assets/icons/checkSuccessBadge.svg";
import checkDangerBadge from "assets/icons/checkDangerBadge.svg";
import Spacer from "./Spacer";
import { connect } from "react-redux";

const Wrapper = styled.div`
  position: absolute;
  // left: 50%;
  // transform: translateX(-50%);
  right: 2.4rem;
  top: 1.2rem;
  height: 5.6rem;
  min-width: 37rem;
  padding: 0 2.4rem;
  background-color: #ffffff;
  box-shadow: 0px 0px 25px 0px #0000000d;
  border-left: 8px solid;
  border-radius: 8px;
  width: max-content;
  transition: all 500ms ease-out;

  &.hide {
    opacity: 0;
    pointer-events: none;
    right: -100rem;
  }

  .cancel {
    .icon {
      height: 1.6rem;
    }
  }

  &.success {
    border-color: var(--success);
  }

  &.danger {
    border-color: var(--danger);
  }
`;

const AlertBox = ({ className, alert_details }) => {
  return (
    <Wrapper
      className={`${className ?? ""} ${
        alert_details?.type ?? "hide"
      } flexRow alignCenter`}
    >
      {alert_details?.type === "success" && (
        <img src={checkSuccessBadge} alt="check success" />
      )}
      {alert_details?.type === "danger" && (
        <img src={checkDangerBadge} alt="check danger" />
      )}
      <Spacer x={1.2} />
      <span className="l2 colorGrey1">{alert_details?.msg}</span>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    alert_details: state.alert_details,
  };
};

export default connect(mapStateToProps)(AlertBox);
