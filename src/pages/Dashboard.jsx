import { Navigate, Route, Routes } from "react-router-dom";

import GiftIdeas from "./GiftIdeas";
import Header from "components/user/Header.";
import Leaderboard from "components/user/Leaderboard";
import Sidebar from "components/user/Sidebar";
import WishsLists from "components/user/WishsLists";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState } from "react";
import Archive from "./Archive";

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
  const token = useSelector((state) => state.auth.token);
  const [headerText, setHeaderText] = useState("My Wish list")

  if (!token) {
    <Navigate to="/home/login" />;
  }

  return (
    <Wrapper>
      <Sidebar setHeaderText={setHeaderText}/>
      <div className="viewContent">
        <Header headerText={headerText}/>
        <Routes>
          {/* <Route path="" element={<WishsLists />} /> */}
          <Route path="wish-lists/*" element={<WishsLists />} />
          <Route path="gift-ideas/*" element={<GiftIdeas />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="/archive" element={<Archive />}/>
        </Routes>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
