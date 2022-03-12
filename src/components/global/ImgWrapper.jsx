import styled from "styled-components";

const ImgWrapper = styled.div`
  height: ${(props) => props.size ?? "4.8"}rem;
  width: ${(props) => props.size ?? "4.8"}rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${(props) => props.bg ?? "#c4c4c470"};

  img {
    height: ${(props) => props.imgHeight ?? "100%"};
  }
`;

export default ImgWrapper;
