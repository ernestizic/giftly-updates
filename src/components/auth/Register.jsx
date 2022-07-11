import closeIcon from "assets/icons/close_square.svg";
// import googleIcon from "assets/icons/google_icon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spacer from "components/global/Spacer";
import { Formik } from "formik";
import * as Yup from "yup";
import FormGroup from "components/global/FormGroup";
import FormWrapper from "components/global/FormWrapper";
import Button from "components/global/Button";
import { useState } from "react";
import CheckBox from "components/global/CheckBox";
import { AuthWrapper } from "./AuthStyles";
import { AuthCard } from "./AuthStyles";
// import { GoogleAuthButton } from "./AuthStyles";
// import { AuthDivider } from "./AuthStyles";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { base_url } from "utils/utils";
import { setUser } from "features/auth/authSlice";
import Logo from "components/global/Logo";

const Register = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const dispatch = useDispatch();

  const schema = Yup.object({
    first_name: Yup.string().required("Fiield required"),
    last_name: Yup.string().required("Fiield required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Field required"),
    password: Yup.string()
      .min(8, "Must be at least eight characters")
      .required("Field required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Field required"),
  });

  const handleRegister = async (cred) => {
    try {
      const res = await axios.post(`${base_url}/auth/register`, cred);

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (!res) {
        dispatch(showAlert("An error occurred"));
        return;
      }

      if (res.data.status === "success") {
        dispatch(setUser(res.data.data));
        navigate("/home/verify-email" + (search ?? ""));
        return;
      }

      dispatch(showAlert(res.data.message));
    } catch (e) {
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));
      dispatch(showAlert(e.response.data.message));
    }
  };

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
          Sign up to Giftly
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
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            await handleRegister(values);
          }}
        >
          {({ handleSubmit, isSubmitting, isValid, values }) => (
            <FormWrapper onSubmit={handleSubmit}>
              <FormGroup
                fieldStyle="shortText"
                label="First name"
                name="first_name"
              />
              <FormGroup
                fieldStyle="shortText"
                label="Last name"
                name="last_name"
              />
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
              <FormGroup
                fieldStyle="shortText"
                type="password"
                label="Confirm password"
                name="password_confirmation"
                className="password spanFull"
              />
              <div className="spanFull flexRow alignCenter">
                <CheckBox
                  id="agreement"
                  name="agreement"
                  isChecked={false}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <Spacer x={0.8} />
                <label className="subtitle-5 prompt2" htmlFor="agreement">
                  I agree to the{" "}
                  <Link to="/terms" className="colorPrimaryMain subtitle-5">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="colorPrimaryMain subtitle-5"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                text="Sign up"
                className="spanFull"
                width="100%"
                loading={isSubmitting}
                disabled={
                  isSubmitting ||
                  !isValid ||
                  !values.email ||
                  !values.password ||
                  !agreedToTerms
                }
              />
              <p className="subtitle-4 prompt1 spanFull">
                Already have an account?{" "}
                <Link to="/home/login" className="colorPrimaryMain">
                  Login
                </Link>
              </p>
            </FormWrapper>
          )}
        </Formik>
      </AuthCard>
    </AuthWrapper>
  );
};

export default Register;
