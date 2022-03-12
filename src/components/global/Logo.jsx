import styled from "styled-components";
import logo from "assets/images/logo.svg";

const Wrapper = styled.div`
  width: max-content;

  img {
    height: 3.8rem;
  }
`;

export default function Logo({ className, onClick = () => null }) {
  return (
    <Wrapper className={`${className ?? ""} logo`} onClick={onClick}>
      <img src={logo} alt="Giftly" />
    </Wrapper>
  );
}
