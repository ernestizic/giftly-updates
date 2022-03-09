import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(0deg);
  }
`;

const Spinner = styled.img`
  height: 24px;
  width: 24px;
  animation: ${spin} 0.5s linear infinite;
`;

const Loader = () => {
  return <Spinner />;
};

export default Loader;
