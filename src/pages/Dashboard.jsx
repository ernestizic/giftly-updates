import Leaderboard from "components/user/Leaderboard";
import Sidebar from "components/user/Sidebar";
import WishsLists from "components/user/WishsLists";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 240px auto;

  .viewContent {
    height: 100vh;
    overflow: auto;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Dashboard = () => {
  return (
    <Wrapper>
      <Sidebar />
      <div className="viewContent">
        <Routes>
          {/* <Route path="" element={<WishsLists />} /> */}
          <Route path="wish-lists/*" element={<WishsLists />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
