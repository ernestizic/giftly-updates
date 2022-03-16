import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Spacer from "components/global/Spacer";
import { Formik } from "formik";
import * as Yup from "yup";
import FormGroup from "components/global/FormGroup";
import FormWrapper from "components/global/FormWrapper";
import Button from "components/global/Button";
import { AuthWrapper } from "./AuthStyles";
import { AuthCard } from "./AuthStyles";
import closeIcon from "assets/icons/close_square.svg";
import handPoint from "assets/images/hand_point.svg";
import { useState } from "react";
import { CardImage } from "./AuthStyles";
import { useDispatch } from "react-redux";
import { base_url } from "utils/utils";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");

  const dispatch = useDispatch();

  const schema_email = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Field required"),
  });

  const schema_password = Yup.object({
    password: Yup.string().required("Field required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Field required"),
  });

  const submitEmail = async (values) => {
    setEmailAddress(values.email);

    try {
      let res = await axios.post(`${base_url}/auth/forgot-password`, values);

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (res.data.status === "success") {
        dispatch(showAlert(res.data.message));
        navigate("/home/password-reset/mail-sent");
      } else if (res.data.status === "failure") {
        dispatch(showAlert(res.data.message));
      } else {
        dispatch(showAlert("An error occurred"));
      }
    } catch (e) {
      console.log(e);
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));
      dispatch(
        showAlert(e.response.data.message || "Invalid request. Try again.")
      );
    }
  };

  const submitPassword = async (values) => {
    const token = window.location.pathname.split("/")[3];
    navigate("/home/login");
    try {
      let res = await axios.post(
        `${base_url}/auth/reset-password/${token}`,
        values
      );

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (res.data.status === "success") {
        dispatch(showAlert(res.data.message));
        navigate("/home/login");
      } else if (res.data.status === "failure") {
        dispatch(showAlert(res.data.message));
      } else {
        dispatch(showAlert("An error occurred"));
      }
    } catch (e) {
      console.log(e);
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));
      dispatch(
        showAlert(e.response.data.message || "Invalid request. Try again.")
      );
    }
  };

  return (
    <Routes>
      {/* Submit email */}
      <Route
        path=""
        element={
          <AuthWrapper className="flexColumn alignCenter">
            <AuthCard>
              <div className="flexRow alignCenter">
                <Link to="/home/login">
                  <img src={closeIcon} alt="icon" />
                </Link>
              </div>
              <Spacer y={2.4} />
              <h1 className="title-3 textCenter colorTitleActive title">
                Forgot Password
              </h1>
              <Spacer y={0.8} />
              <p className="body-3 subtitle textCenter">
                Enter your email address and we will send instructions to reset
                your password.
              </p>
              <Spacer y={2.4} />
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={schema_email}
                onSubmit={async (values) => {
                  await submitEmail(values);
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
                    <Button
                      type="submit"
                      text={"Send reset instructions"}
                      loading={isSubmitting}
                      className="spanFull"
                      disabled={!isValid || !values.email || isSubmitting}
                      width="100%"
                    />
                    <Button
                      type="button"
                      text="Back to login"
                      className="spanFull noBorder"
                      width="100%"
                      onClick={() => navigate("/home/login")}
                    />
                  </FormWrapper>
                )}
              </Formik>
            </AuthCard>
          </AuthWrapper>
        }
      />

      {/* Mail sent */}
      <Route
        path="mail-sent"
        element={
          <AuthWrapper className="flexColumn alignCenter">
            <AuthCard>
              <CardImage src={handPoint} alt="Pointing hand" />
              <Spacer y={2.4} />
              <h3 className="title-3 colorTitleActive title textCenter">
                Check your email
              </h3>
              <Spacer y={2.4} />
              <p className="subtitle-3 colorTextDescription textCenter">
                We’ve emailed {emailAddress ?? "your"} with instructions to
                reset your password. Check your spam box if you didn’t see the
                email.
              </p>
            </AuthCard>
          </AuthWrapper>
        }
      />

      {/* Reset password */}
      <Route
        path=":token"
        element={
          <AuthWrapper className="flexColumn alignCenter">
            <AuthCard>
              <div className="flexRow alignCenter">
                <Link to="/home/login">
                  <img src={closeIcon} alt="icon" />
                </Link>
              </div>
              <Spacer y={2.4} />
              <h1 className="title-3 textCenter colorTitleActive title">
                Create New Password
              </h1>
              {/* <Spacer y={0.8} />
              <p className="body-3 subtitle textCenter">
                Your new password must be different from previously used
                passwords.
              </p> */}
              <Spacer y={2.4} />
              <Formik
                initialValues={{
                  password: "",
                  password_confirmation: "",
                }}
                validationSchema={schema_password}
                onSubmit={async (values) => {
                  await submitPassword(values);
                }}
              >
                {({ handleSubmit, isSubmitting, isValid, values }) => (
                  <FormWrapper onSubmit={handleSubmit}>
                    <FormGroup
                      fieldStyle="shortText"
                      type="password"
                      label="New password"
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
                      text={"Reset password"}
                      loading={isSubmitting}
                      className="spanFull"
                      disabled={
                        !isValid ||
                        !values.password ||
                        !values.password_confirmation ||
                        isSubmitting
                      }
                      width="100%"
                    />
                  </FormWrapper>
                )}
              </Formik>
            </AuthCard>
          </AuthWrapper>
        }
      />
    </Routes>
  );
};

export default ForgotPassword;
