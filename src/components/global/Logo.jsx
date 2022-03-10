import styled from "styled-components";
import logo from "assets/images/logo.svg";

const Wrapper = styled.div`
  width: max-content;

  img {
    height: 3.8rem;
  }
`;

export default function Logo({ onClick = () => null }) {
  return (
    <Wrapper onClick={onClick}>
      <img src={logo} alt="PostPaddy" />
    </Wrapper>
  );
}
