import styled, { keyframes } from "styled-components";
import spinnerIcon from "assets/icons/spinner.png";

const spin = keyframes`
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(360deg);
  }
`;

const Spinner = styled.img`
  height: 24px;
  width: 24px;
  animation: ${spin} 0.5s linear infinite;
`;

const Loader = () => {
  return <Spinner src={spinnerIcon} alt="..." />;
};

export default Loader;
