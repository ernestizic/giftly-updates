import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) =>
    props.transparent ? "transparent" : "#00000050"};
  z-index: 5;
  overflow: auto;
`;

export default Backdrop;
