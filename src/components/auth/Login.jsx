import closeIcon from "assets/icons/close_square.svg";
import googleIcon from "assets/icons/google_icon.svg";
import { Link, useNavigate } from "react-router-dom";
import Spacer from "components/global/Spacer";
import { Formik } from "formik";
import * as Yup from "yup";
import FormGroup from "components/global/FormGroup";
import FormWrapper from "components/global/FormWrapper";
import Button from "components/global/Button";
import { useEffect, useState } from "react";
import CheckBox from "components/global/CheckBox";
import { AuthWrapper } from "./AuthStyles";
import { AuthCard } from "./AuthStyles";
import { GoogleAuthButton } from "./AuthStyles";
import { AuthDivider } from "./AuthStyles";

const Login = () => {
  const navigate = useNavigate();

  const schema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Field required"),
    password: Yup.string().required("Field required"),
  });

  const rememberMe = (values) => {
    const rmCheck = document.getElementById("rememberMe");

    if (rmCheck.checked && values.email !== "") {
      localStorage.username = values.email.trim();
      localStorage.checkbox = rmCheck.value;
    } else {
      localStorage.username = "";
      localStorage.checkbox = "";
    }
  };

  const handleLogin = async (cred) => {
    rememberMe(cred);
    navigate("/user");
    return;
  };

  useEffect(() => {
    const rmCheck = document.getElementById("rememberMe");

    if (localStorage.checkbox && localStorage.checkbox !== "") {
      rmCheck?.click();
    } else {
      rmCheck?.removeAttribute("checked");
    }
  });

  return (
    <AuthWrapper className="flexColumn alignCenter">
      <AuthCard>
        <div className="flexRow alignCenter justifySpaceBetween">
          <Link to="/home">
            <img src={closeIcon} alt="icon" />
          </Link>
          <p className="subtitle-4 prompt1">
            Don't have an account?{" "}
            <Link to="/home/sign-up" className="colorPrimaryMain">
              Sign up
            </Link>
          </p>
        </div>
        <Spacer y={2.4} />
        <h1 className="title-3 textCenter colorTitleActive title">
          Login to Giftly
        </h1>
        <Spacer y={3.2} />
        <GoogleAuthButton
          className="flexRow alignCenter justifyCenter borderLight"
          type="button"
        >
          <img src={googleIcon} alt="icon" />
          <Spacer x={0.8} />
          <span className="colorTitleActive">Continue with google</span>
        </GoogleAuthButton>
        <Spacer y={2.4} />
        <AuthDivider>
          <p className="text subtitle-5">OR WITH</p>
        </AuthDivider>
        <Spacer y={3.2} />
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({ handleSubmit, isSubmitting, isValid, values }) => (
            <FormWrapper onSubmit={handleSubmit}>
              <FormGroup
                fieldStyle="shortText"
                type="email"
                label="Email address"
                name="email"
                className="spanFull"
              />
              <FormGroup
                fieldStyle="shortText"
                type="password"
                label="Password"
                name="password"
                className="password spanFull"
              />
              <div className="flexRow justifySpaceBetween spanFull">
                <CheckBox
                  id="rememberMe"
                  name="rememberMe"
                  label="Remember me"
                  value="rememberMe"
                />
                <div>
                  <Link to="/home/password-reset" className="colorPrimaryMain">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                text="Sign in"
                className="spanFull"
                width="100%"
                loading={isSubmitting}
                disabled={
                  isSubmitting || !isValid || !values.email || !values.password
                }
              />
            </FormWrapper>
          )}
        </Formik>
      </AuthCard>
    </AuthWrapper>
  );
};

export default Login;
