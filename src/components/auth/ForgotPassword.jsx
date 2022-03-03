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
import handPoint from "assets/images/hand_point.png";
import { useState } from "react";
import axios from "axios";
import { CardImage } from "./AuthStyles";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const schema_email = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Field required"),
  });

  const schema_password = Yup.object({
    new_password: Yup.string()
      .min(8, "Must be at least eight characters")
      .required("Field required"),
    new_password_confirmation: Yup.string()
      .min(8, "Must be at least eight characters")
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Field required"),
  });

  const submitEmail = async (values) => {
    setEmailAddress(values.email);
    navigate("/home/password-reset/mail-sent");
    // try {
    //   let res = await axios.post(
    //     `${initialState.api_host}/PasswordReset/Request`,
    //     values
    //   );

    //   if (res.data.status === "success") {
    //     navigate("/forgot-password/mail-sent");
    //     showAlert({
    //       msg: res.data.message,
    //       type: "success",
    //     });
    //   } else if (res.data.status === "failure") {
    //     showAlert({
    //       msg: res.data.message,
    //       type: "danger",
    //     });
    //   } else {
    //     showAlert({
    //       msg: "An error occurred. Try again.",
    //       type: "danger",
    //     });
    //   }
    // } catch (e) {
    //   showAlert({
    //     msg: "Invalid request. Try again.",
    //     type: "danger",
    //   });
    // }
  };

  const submitPassword = async (values) => {
    const token = window.location.pathname.split("/")[2];
    const data = { ...values, token };
    navigate("/home/login");
    // try {
    //   let res = await axios.post(
    //     `${initialState.api_host}/PasswordReset/SetNow`,
    //     data
    //   );

    //   if (res.data.status === "success") {
    //     navigate("/sign-in");
    //     showAlert({
    //       msg: "Password changed sucessfully, sign in to continue using PostPaddy",
    //       type: "success",
    //     });
    //   } else if (res.data.status === "failure") {
    //     showAlert({
    //       msg: "An error occurred. Please try again",
    //       type: "danger",
    //     });
    //   } else {
    //     showAlert({
    //       msg: "Something went wrong",
    //       type: "danger",
    //     });
    //   }
    // } catch (e) {
    //   showAlert({
    //     msg: "Invalid request. Try again.",
    //     type: "danger",
    //   });
    // }
  };

  return (
    <Routes>
      {/* Submit email */}
      <Route
        path=""
        element={
          <AuthWrapper className="flexColumn alignCenter">
            <AuthCard>
              <div className="flexRow alignCenter justifyEnd">
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
                {({ handleSubmit, isValid, values }) => (
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
                      text={isSubmitting ? "..." : "Send reset instructions"}
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
              <div className="flexRow alignCenter justifyEnd">
                <Link to="/home/login">
                  <img src={closeIcon} alt="icon" />
                </Link>
              </div>
              <Spacer y={2.4} />
              <h1 className="title-3 textCenter colorTitleActive title">
                Create New Password
              </h1>
              <Spacer y={0.8} />
              <p className="body-3 subtitle textCenter">
                Your new password must be different from previously used
                passwords.
              </p>
              <Spacer y={2.4} />
              <Formik
                initialValues={{
                  new_password: "",
                  new_password_confirmation: "",
                }}
                validationSchema={schema_password}
                onSubmit={async (values) => {
                  await submitPassword(values);
                }}
              >
                {({ handleSubmit, isValid, values }) => (
                  <FormWrapper onSubmit={handleSubmit}>
                    <FormGroup
                      fieldStyle="shortText"
                      type="password"
                      label="New password"
                      name="new_password"
                      className="password spanFull"
                    />
                    <FormGroup
                      fieldStyle="shortText"
                      type="password"
                      label="Confirm password"
                      name="new_password_confirmation"
                      className="password spanFull"
                    />
                    <Button
                      type="submit"
                      text={isSubmitting ? "..." : "Reset password"}
                      className="spanFull"
                      disabled={
                        !isValid ||
                        !values.new_password ||
                        !values.new_password_confirmation ||
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
