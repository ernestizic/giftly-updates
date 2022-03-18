import ForgotPassword from "components/auth/ForgotPassword";
import Login from "components/auth/Login";
import Register from "components/auth/Register";
import VerifyEmail from "components/auth/VerifyEmail";
import Home from "components/landing/Home";
import CreateWishList from "components/wishlist/CreateWishList";
import DeletePrompt from "components/wishlist/DeletePrompt";
import SignupPrompt from "components/wishlist/SignupPrompt";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
// import "../index.css"

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--title-active);
`;

const Landing = () => {
  return (
    <Wrapper>
      {/*

      Components for landing page will go here:

      - create a folder inside components called "landing" and build each section as a component.
      - Any component you feel should be global should go into the global folder
      - Create a branch called "landing" to push your updates to
      
      */}

      <Home />

      <Routes>
        {/* Auth */}
        <Route path="sign-up" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="login" element={<Login />} />
        <Route path="password-reset/*" element={<ForgotPassword />} />

        {/* Wish list */}
        <Route path="new-wishlist" element={<CreateWishList />} />
        <Route path="register-prompt" element={<SignupPrompt />} />
        <Route path="delete-prompt" element={<DeletePrompt />} />

        {/* Home */}
      </Routes>
    </Wrapper>
  );
};

export default Landing;
