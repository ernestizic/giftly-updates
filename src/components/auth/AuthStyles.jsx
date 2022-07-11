import styled from "styled-components";
import Backdrop from "../global/Backdrop";

export const AuthWrapper = styled(Backdrop)`
  padding: 72px 0;
  z-index: 20;

  #fromTrigger {
    display: none;
  }

  @media screen and (max-width: 768px) {
    padding: 72px 8px;
  }
`;

export const AuthCard = styled.div`
  width: 480px;
  // max-height: 640px;
  // overflow: auto;
  margin: auto;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 48px;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 24px 16px;

    .title {
      font-size: 24px;
      line-height: 36px;
    }

    .prompt1 {
      font-size: 14px;
      line-height: auto;
    }

    .prompt2 {
      font-size: 12px;
      line-height: auto;
    }
  }
`;

export const GoogleAuthButton = styled.button`
  width: 100%;
  padding: 12px 0;
  border-radius: 8px;
`;

export const AuthDivider = styled.div`
  height: 1px;
  background-color: var(--line);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    position: absolute;
    // top: 50%;
    // transform: translateY(-50%);
    padding: 0 16px;
    background-color: #ffffff;
    text-align: center;
    width: max-content;
    margin: auto;
  }
`;

export const CardImage = styled.img`
  display: block;
  width: 330px;
  margin: auto;

  &.icon {
    width: 48px;
  }

  @media screen and (max-width: 768px) {
    width: 160px;

    &.icon {
      width: 48px;
    }
  }
`;
