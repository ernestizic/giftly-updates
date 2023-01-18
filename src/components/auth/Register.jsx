import * as Yup from "yup";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";

import { AuthCard } from "./AuthStyles";
import { AuthWrapper } from "./AuthStyles";
import Button from "components/global/Button";
import CloseModal from "components/global/CloseModal";
import FormGroup from "components/global/FormGroup";
import FormWrapper from "components/global/FormWrapper";
import { Formik } from "formik";
import Logo from "components/global/Logo";
import Spacer from "components/global/Spacer";
import axios from "axios";
import { base_url } from "utils/utils";
import { setUser } from "features/auth/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useDispatch();

  const schema = Yup.object({
    first_name: Yup.string().required("Field required"),
    last_name: Yup.string().required("Field required"),
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
        <CloseModal callback={() => navigate("/home")} />
        <Spacer y={2.4} />
        <div className="flexRow justifyCenter">
          <Logo />
        </div>
        <Spacer y={0.8} />
        <h1 className="textCenter colorTitleActive">
          Sign up
        </h1>
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
                  !values.password
                }
              />
            <p className="spanFull textCenter colorTitleActive">
              By signing up on Giftly, you agree to our Privacy Policy and Terms of Service
            </p>

              <p className="subtitle-4 prompt1 spanFull textCenter">
                Already have an account?{" "}
                <Link to="/home/login" className="colorPrimaryMain">
                  Sign in
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
