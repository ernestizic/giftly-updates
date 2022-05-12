import ForgotPassword from "components/auth/ForgotPassword";
import Login from "components/auth/Login";
import Register from "components/auth/Register";
import ResendVerificationEmail from "components/auth/ResendVerificationEmail";
import VerifyEmail from "components/auth/VerifyEmail";
import Home from "components/landing/Home";
import CreateWishList from "components/wishlist/CreateWishList";
import DeletePrompt from "components/wishlist/DeletePrompt";
import SignupPrompt from "components/wishlist/SignupPrompt";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
// import "../index.css"

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--title-active);
`;

const Landing = () => {
  useEffect(() => {
    
    // eslint-disable-next-line
  }, [])

  return (
    <Wrapper>

      <Home />

      <Routes>
        {/* Auth */}
        <Route path="sign-up" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="login" element={<Login />} />
        <Route path="password-reset/*" element={<ForgotPassword />} />
        <Route
          path="resend-verification-email"
          element={<ResendVerificationEmail />}
        />

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
