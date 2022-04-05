import closeIcon from "assets/icons/close_square.svg";
// import googleIcon from "assets/icons/google_icon.svg";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
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
// import { GoogleAuthButton } from "./AuthStyles";
// import { AuthDivider } from "./AuthStyles";
import Logo from "components/global/Logo";
import axios from "axios";
import { base_url } from "utils/utils";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const emailVerificationStatus = new URLSearchParams(search).get("status");
  const emailVerificationMessage = new URLSearchParams(search).get("message");

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [isChecked, setChecked] = useState(false);

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

    try {
      const res = await axios.post(`${base_url}/auth`, cred);

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (!res) {
        dispatch(showAlert("An error occurred"));
        return;
      }

      if (res.data.status === "success") {
        dispatch(setUser(res.data.data.user));
        dispatch(setToken(res.data.data.token.token));
        navigate("/user/wish-lists");
        return;
      }

      dispatch(showAlert(res.data.message));
    } catch (e) {
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));
      dispatch(showAlert(e.response.data.message));

      if (e.response.data.email && e.response.data.emailVerified === false) {
        navigate("/home/resend-verification-email");
      }
    }
  };

  const checkEmailVerification = () => {
    if (!emailVerificationMessage || !emailVerificationStatus) {
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(clearAlert());
    }, 5000);
    dispatch(setAlertTimeout(timeout));

    if (emailVerificationStatus === "failure") {
      navigate("/home/resend-verification-email");
    }

    if (emailVerificationMessage) {
      dispatch(showAlert(emailVerificationMessage));
    }
  };

  useEffect(() => {
    checkEmailVerification();

    if (localStorage.checkbox && localStorage.checkbox !== "") {
      setChecked(true);
    } else {
      setChecked(false);
    }
    // eslint-disable-next-line
  }, []);

  if (token) {
    return (
      <Navigate
        to={
          user?.username
            ? "/user/wish-lists"
            : "/user/wish-lists/create-username"
        }
      />
    );
  }

  return (
    <AuthWrapper className="flexColumn alignCenter">
      <AuthCard>
        <div className="flexRow alignCenter">
          <Link to="/home">
            <img src={closeIcon} alt="icon" />
          </Link>
        </div>
        <Spacer y={2.4} />
        <div className="flexRow justifyCenter">
          <Logo />
        </div>
        <Spacer y={0.8} />
        <h1 className="title-3 textCenter colorTitleActive title">
          Login to Giftly
        </h1>
        <Spacer y={3.2} />
        {/* <GoogleAuthButton
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
        <Spacer y={3.2} /> */}
        <Formik
          initialValues={{
            email: localStorage.username || "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            await handleLogin(values);
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
                  isChecked={isChecked}
                />
                <div>
                  <Link
                    to="/home/password-reset"
                    className="colorPrimaryMain label"
                  >
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
              <p className="subtitle-4 prompt1 spanFull">
                Don't have an account?{" "}
                <Link to="/home/sign-up" className="colorPrimaryMain">
                  Sign up
                </Link>
              </p>
            </FormWrapper>
          )}
        </Formik>
      </AuthCard>
    </AuthWrapper>
  );
};

export default Login;
