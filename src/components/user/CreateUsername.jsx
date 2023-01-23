import { useNavigate } from "react-router-dom";
import Spacer from "components/global/Spacer";
import { Formik } from "formik";
import * as Yup from "yup";
import FormGroup from "components/global/FormGroup";
import FormWrapper from "components/global/FormWrapper";
import Button from "components/global/Button";
import { AuthWrapper, AuthCard } from "components/auth/AuthStyles";
import Logo from "components/global/Logo";
import axios from "axios";
import { base_url } from "utils/utils";
import {setAlert} from "features/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "features/auth/authSlice";

const CreateUsername = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const schema = Yup.object({
    username: Yup.string().matches(/^[a-zA-Z0-9_]+$/, "Username is not valid").required("Field required"),
  });

  const handleCreate = async (cred) => {
    try {
      const res = await axios.post(
        `${base_url}/user/username`,
        { username: cred.username.split(" ").join("_") },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res) {
        dispatch(setAlert({
          type: 'error',
          message: "An error occurred",
        }))
        return;
      }

      if (res.data.status === "success") {
        dispatch(setAlert({
          type: 'success',
          message: res.data.message,
        }))
        dispatch(
          setUser({ ...user, username: cred.username.split(" ").join("_") })
        );
        navigate("/user/wish-lists/select-interests");
        return;
      }

      dispatch(setAlert({
        type: 'success',
        message: res.data.message,
      }))
    } catch (e) {
      dispatch(setAlert({
        type: 'error',
        message: e.response.data.message || "Something went wrong",
      }))
    }
  };

  return (
    <AuthWrapper className="flexColumn alignCenter">
      <AuthCard>
        <Spacer y={2.4} />
        <div className="flexRow justifyCenter">
          <Logo />
        </div>
        <Spacer y={0.8} />
        <h1 className="textCenter colorTitleActive">
          Create a username
        </h1>
        <p className="body-3 textCenter colorTitleActive">
          Create a unique username personalized for yourself on Giftly.
        </p>
        <Spacer y={3.2} />
        <Formik
          initialValues={{
            username: "",
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            await handleCreate(values);
          }}
        >
          {({ handleSubmit, isSubmitting, isValid, values }) => (
            <FormWrapper onSubmit={handleSubmit}>
              <div className="spanFull">
                <FormGroup
                  fieldStyle="shortText"
                  label="Username"
                  name="username"
                  className="spanFull"
                />
                {/* <span className="subtitle-5">
                  Usernames can contain only letters, numbers &amp; underscore,
                  no spaces.
                </span> */}
              </div>

              <Button
                type="submit"
                text="Next step"
                className="spanFull"
                width="100%"
                loading={isSubmitting}
                disabled={isSubmitting || !isValid || !values.username}
              />
            </FormWrapper>
          )}
        </Formik>
      </AuthCard>
    </AuthWrapper>
  );
};

export default CreateUsername;
