import AlertBox from "components/global/AlertBox";
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
`;

const Dashboard = () => {
  return (
    <Wrapper>
      <AlertBox className="dashboard" />
      <Sidebar />
      <div className="viewContent">
        <Routes>
          <Route path="wish-lists/*" element={<WishsLists />} />
        </Routes>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
