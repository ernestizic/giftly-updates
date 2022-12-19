import styled from "styled-components";

const ImageWrapper = styled.div`
  aspect-ratio: 1/1;
  border-radius: 16px;
  overflow: hidden;
  background-color: #f5f5f5;

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default ImageWrapper;
