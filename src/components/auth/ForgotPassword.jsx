import * as Yup from "yup";

import { Route, Routes, useNavigate } from "react-router-dom";
import { setAlert } from "features/alert/alertSlice";

import { AuthCard, PasswordReset } from "./AuthStyles";
import { AuthWrapper } from "./AuthStyles";
import Button from "components/global/Button";
import Logo from 'assets/images/logo.svg'
import CloseModal from "components/global/CloseModal";
import FormGroup from "components/global/FormGroup";
import FormWrapper from "components/global/FormWrapper";
import { Formik } from "formik";
import React from "react";
import Spacer from "components/global/Spacer";
import axios from "axios";
import { base_url } from "utils/utils";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState(null);

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

      if (res.data.status === "success") {
        dispatch(setAlert({
          type: 'success',
          message: res.data.message
        }))
        navigate("/home/password-reset/mail-sent");
      } else if (res.data.status === "failure") {
        dispatch(setAlert({
          type: 'error',
          message: res.data.message
        }))
      } else {
        dispatch(setAlert({
          type: 'error',
          message: "An error occurred"
        }))
      }
    } catch (e) {
      console.log(e);
      dispatch(
        dispatch(setAlert({
          type: 'error',
          message: e.response.data.message || "Invalid request. Try again."
        }))
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

      if (res.data.status === "success") {
        dispatch(setAlert({
          type: 'success',
          message: res.data.message
        }))
        navigate("/home/login");
      } else if (res.data.status === "failure") {
        dispatch(setAlert({
          type: 'error',
          message: res.data.message
        }))
      } else {
        dispatch(setAlert({
          type: 'error',
          message: "An error occurred"
        }))
      }
    } catch (e) {
      console.log(e);
      dispatch(setAlert({
        type: 'error',
        message: e.response.data.message || "Invalid request. Try again."
      }))
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
              <CloseModal callback={() => navigate("/home/login")} />
              <Spacer y={2.4} />
              <div className="textCenter">
                <img src={Logo} alt='logo' height='50px' width='auto' />
                <h1 className="colorTitleActive">
                  Forgot Password
                </h1>
              </div>
              <Spacer y={0.8} />
              <p className="body-3 subtitle textCenter colorTitleActive">
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
          <PasswordReset>
            <button className='back-btn' onClick={() => navigate('/home/login')}>
              Go back to site
            </button>
            <Spacer y={5.2} />
            <div>
              <img src={Logo} alt='logo' height='50px' width='auto' />
              <Spacer y={1.2} />
              <p className="body-3">
                  To reset your password, follow the instructions in the email we sent to {emailAddress ?? "you"}. 
                  If you can't find it, check your spam box.
              </p>
      
              {/* <button type='button'>Resend email</button> */}
            </div>
          </PasswordReset>
        }
      />

      {/* Reset password */}
      <Route
        path=":token"
        element={
          <AuthWrapper className="flexColumn alignCenter">
            <AuthCard>
              <CloseModal callback={() => navigate("/home/login")} />
              <Spacer y={2.4} />
              <div className="textCenter">
                <img src={Logo} alt='logo' height='50px' width='auto' />
                <h1 className="colorTitleActive">
                  Create New Password
                </h1>
              </div>
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
