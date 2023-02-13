import * as Yup from "yup";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {setAlert} from "features/alert/alertSlice";
import { setToken, setUser } from "features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { AuthCard } from "./AuthStyles";
import { AuthWrapper } from "./AuthStyles";
import Button from "components/global/Button";
// import CheckBox from "components/global/CheckBox";
import CloseModal from "components/global/CloseModal";
import FormGroup from "components/global/FormGroup";
import FormWrapper from "components/global/FormWrapper";
import { Formik } from "formik";
import Logo from "components/global/Logo";
import Spacer from "components/global/Spacer";
import axios from "axios";
import { base_url } from "utils/utils";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const emailVerificationStatus = new URLSearchParams(search).get("status");
  const emailVerificationMessage = new URLSearchParams(search).get("message");

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // const [isChecked, setChecked] = useState(false);

  const schema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Field required"),
    password: Yup.string().required("Field required"),
  });

  // const rememberMe = (values) => {
  //   const rmCheck = document.getElementById("rememberMe");

  //   if (rmCheck.checked && values.email !== "") {
  //     localStorage.username = values.email.trim();
  //     localStorage.checkbox = rmCheck.value;
  //   } else {
  //     localStorage.username = "";
  //     localStorage.checkbox = "";
  //   }
  // };

  const handleLogin = async (cred) => {
    // rememberMe(cred);

    try {
      const res = await axios.post(`${base_url}/auth`, cred);

      if (!res) {
        dispatch(setAlert({
          message: "An error occurred"
      }))
        return;
      }

      if (res.data.status === "success") {
        dispatch(setUser(res.data.data.user));
        dispatch(setToken(res.data.data.token.token));
        localStorage.removeItem("userRegistrationEmail")
        navigate("/user/wish-lists");
        return;
      }
      dispatch(setAlert({
        message: res.data.message
      }))
    } catch (e) {
      dispatch(setAlert({
        message: e.response.data.message
      }))

      if (e.response.data.email && e.response.data.emailVerified === false) {
        navigate("/verify-email");
      }
    }
  };

  const checkEmailVerification = () => {
    if (!emailVerificationMessage || !emailVerificationStatus) {
      return;
    }

    if (emailVerificationStatus === "failure") {
      navigate("/verify-email");
    }

    if (emailVerificationMessage) {
      dispatch(setAlert({
        message: emailVerificationMessage
      }))
    }
  };

  useEffect(() => {
    checkEmailVerification();

    // if (localStorage.checkbox && localStorage.checkbox !== "") {
    //   setChecked(true);
    // } else {
    //   setChecked(false);
    // }
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
        <CloseModal callback={() => navigate("/home")} />
        <Spacer y={2.4} />
        <div className="flexRow justifyCenter">
          <Logo />
        </div>
        <Spacer y={0.8} />
        <h1 className="textCenter colorTitleActive title">
          Sign in
        </h1>
        <Spacer y={1.2} />
        <p className="sign-in-sub-text">Welcome back! Enter your email and password below to sign in.</p>
        <Spacer y={3.2} />
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
                {/* <CheckBox
                  id="rememberMe"
                  name="rememberMe"
                  label="Remember me"
                  value="rememberMe"
                  isChecked={isChecked}
                /> */}
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
              <p className="subtitle-4 prompt1 spanFull textCenter">
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
