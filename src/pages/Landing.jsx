import { Route, Routes } from "react-router-dom";

import CreateWishList from "components/wishlist/CreateWishList";
import DeletePrompt from "components/wishlist/DeletePrompt";
import ForgotPassword from "components/auth/ForgotPassword";
import GiftSuggestions from "components/user/GiftSuggestions";
import Home from "components/landing/Home";
import Login from "components/auth/Login";
import Register from "components/auth/Register";
// import ResendVerificationEmail from "components/auth/ResendVerificationEmail";
import SignupPrompt from "components/wishlist/SignupPrompt";
// import VerifyEmail from "components/auth/VerifyEmail";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--title-active);
`;

const Landing = () => {
  return (
    <Wrapper>

      <Home />

      <Routes>
        {/* Auth */}
        <Route path="sign-up" element={<Register />} />
        {/* <Route path="verify-email" element={<VerifyEmail />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="password-reset/*" element={<ForgotPassword />} />
        {/* <Route
          path="resend-verification-email"
          element={<ResendVerificationEmail />}
        /> */}

        {/* Wish list */}
        <Route path="new-wishlist" element={<CreateWishList />} />
        <Route path="gift-suggestions" element={<GiftSuggestions />} />
        <Route path="register-prompt" element={<SignupPrompt />} />
        <Route path="delete-prompt" element={<DeletePrompt />} />

        {/* Home */}
      </Routes>
    </Wrapper>
  );
};

export default Landing;
