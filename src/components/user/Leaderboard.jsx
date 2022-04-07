import styled from "styled-components";
import Spacer from "components/global/Spacer";
import Header from "./Header.";

const Wrapper = styled.div``;

const searchCategories = ["Friends"];

const Leaderboard = () => {
  return (
    <Wrapper>
      <Header />
      <Spacer y={2.4} />

      <Spacer y={4.8} />
    </Wrapper>
  );
};

export default Leaderboard;
