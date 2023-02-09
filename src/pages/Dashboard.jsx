import { Navigate, Route, Routes } from "react-router-dom";

import GiftIdeas from "./GiftIdeas";
import Header from "components/user/Header.";
import Leaderboard from "components/user/Leaderboard";
import Sidebar from "components/user/Sidebar";
import WishsLists from "components/user/WishsLists";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Archive from "./Archive";
import SearchPage from "./SearchPage";

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
  .viewContent {
    max-height: 100%;
  }
`;

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    <Navigate to="/home/login" />;
  }

  return (
    <Wrapper>
      <Sidebar/>
      <div className="viewContent">
        <Header />
        <Routes>
          {/* <Route path="" element={<WishsLists />} /> */}
          <Route path="wish-lists/*" element={<WishsLists />} />
          <Route path="gift-ideas/*" element={<GiftIdeas />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="/archive/*" element={<Archive />}/>
          <Route path="/gift-ideas/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
