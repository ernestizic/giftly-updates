import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: ${(props) =>
    props.transparent ? "transparent" : "#00000050"};
  z-index: 15;
  overflow: auto;
`;

export default Backdrop;
