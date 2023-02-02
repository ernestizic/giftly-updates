import Backdrop from "../global/Backdrop";
import styled from "styled-components";

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
  .sign-in-sub-text{
    text-align: center;
    max-width: 95%;
    font-size: 16px;
    margin: auto;
    color: var(--gray-scale)
  }

  @media screen and (max-width: 768px) {
    width: calc(100% - 32px);
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

export const VerifyEmailContainer = styled.div`
  min-height: 100vh;
  background: var(--title-active);
  & > div {
        clear: both;
        max-width: 40%;
        margin: 0 auto;
        p{
            color: var(--accent_2-light);
            margin-bottom: 40px;
        }
        button{
            color: var(--primary-dark)
        }
    }
  .back-btn{
      float: right;
      margin: 30px 30px 100px;
      padding: 15px 40px;
      border-radius: 10px;
      font-size: 16px;
      color: var(--title-active);
      background: var(--accent_2-light);
      &:hover {
          cursor: pointer;
      }
  }
	#fromTrigger {
		display: none;
	}

  @media only screen and (max-width: 768px) {
      & > div {
          clear: both;
          max-width: 90%;
      }
  
      .back-btn{
          padding: 10px 30px;
      }
  }
`;

export const PasswordReset = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100vh;
  z-index: 10;
  background: var(--title-active);
  & > div {
        clear: both;
        max-width: 40%;
        margin: 0 auto;
        p{
            color: var(--accent_2-light);
            margin-bottom: 40px;
        }
        button{
            color: var(--primary-dark)
        }
    }
  .back-btn{
      float: right;
      margin: 30px 30px 100px;
      padding: 15px 40px;
      border-radius: 10px;
      font-size: 16px;
      color: var(--title-active);
      background: var(--accent_2-light);
      &:hover {
          cursor: pointer;
      }
  }

  @media only screen and (max-width: 768px) {
      & > div {
          clear: both;
          max-width: 90%;
      }
  
      .back-btn{
          padding: 10px 30px;
      }
  }
`

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
