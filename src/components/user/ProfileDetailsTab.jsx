import React, {useState, useEffect} from 'react';
import Button from "components/global/Button";
import FormGroup from "components/global/FormGroup";
import FormWrapper from "components/global/FormWrapper";
import ImgWrapper from "components/global/ImgWrapper";
import { Initials } from "./WishListsStyles";
import cameraIcon from "assets/icons/camera.svg";
import {
    setAlert
} from "features/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import Spacer from "components/global/Spacer";
import { base_url } from "utils/utils";
import { setUser } from "features/auth/authSlice";
import * as Yup from "yup";
import { Formik } from "formik";
import Loader from "components/global/Loader";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileDetailsTab = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()

    const [imgDetails, setImgDetails] = useState(null);
    const [userImage, setUserImage] = useState(user?.avatar);
    const getUser = async () => {
        try {
          const res = await axios.get(`${base_url}/user/${user.username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (res.data.status === "success") {
            dispatch(setUser(res.data.data.user));
          }
        } catch (e) {
          console.log(e);
        }
      };

    const uploadAvatar = async (file) => {
        const data = new FormData();
    
        data.append("avatar", file);
    
        try {
          const res = await axios.patch(`${base_url}/user/avatar`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (!res) {
            dispatch(setAlert({
              type: 'error',
              message: "An error occurred"
            }))
            return;
          }
    
          if (res.data.status === "success") {
            // dispatch(setUser({ ...user, avatar: res.data.data }));
            getUser();
            dispatch(setAlert({
              type: 'success',
              message: res.data.message
            }))
            return;
          }
          dispatch(setAlert({
            type: 'success',
            message: res.data.message
          }))
        } catch (e) {
          dispatch(setAlert({
            type: 'error',
            message: e.response.data.message || "Something went wrong"
          }))
        }
      };
    
      const removeAvatar = async () => {
        try {
          const res = await axios.delete(`${base_url}/user/avatar`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (!res) {
            dispatch(setAlert({
              type: 'error',
              message: "An error occurred"
            }))
            return;
          }
    
          if (res.data.status === "success") {
            dispatch(setUser(res.data.data));
            dispatch(setAlert({
              type: 'success',
              message: res.data.message
            }))
            return;
          }
          dispatch(setAlert({
            type: 'success',
            message: res.data.message
          }))
        } catch (e) {
          dispatch(setAlert({
            type: 'error',
            message: e.response.data.message || "Something went wrong"
          }))
        }
      };
    
      const loadFile = (e) => {
        const file = e.target.files[0];
        if (file) {
          uploadAvatar(file);
          setImgDetails(file);
        }
      };
    
      const schema = Yup.object({
        first_name: Yup.string().required("Field required"),
        last_name: Yup.string().required("Field required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Field required"),
        username: Yup.string().required("Field required"),
        password: Yup.string(),
      });
    
      const handleSave = async (data) => {
        try {
          const res = await axios.patch(`${base_url}/user`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (!res) {
            dispatch(setAlert({
              type: 'error',
              message: "An error occurred"
            }))
            return;
          }
    
          if (res.data.status === "success") {
            dispatch(setUser(res.data.data));
            dispatch(setAlert({
              type: 'success',
              message: res.data.message
            }))
            return;
          }
    
          dispatch(setAlert({
            type: 'success',
            message: res.data.message
          }));
          
        } catch (e) {
          dispatch(setAlert({
            type: 'error',
            message: e.response.data.message || "Something went wrong"
          }));
        }
      };

          
      useEffect(() => {
        getUser();
        // eslint-disable-next-line
      }, []);


	return (
		<div>
			<div className='uploadWrapper flexRow alignCenter'>
				{imgDetails ? (
					<ImgWrapper size={7.2} imgHeight={'100%'}>
						<img src={imgDetails && URL.createObjectURL(imgDetails)} alt='' />
					</ImgWrapper>
				) : userImage ? (
					<ImgWrapper size={7.2} imgHeight={'100%'}>
						<img src={userImage} alt='' />
					</ImgWrapper>
				) : (
					<Initials size={72} textSize={24} bg='var(--primary-main)'>
						<span className='text'>
							{user?.first_name.charAt(0)}
							{user?.last_name.charAt(0)}
						</span>
					</Initials>
				)}
				<Spacer x={1.6} />
				<div>
					<input
						type='file'
						accept='image/*'
						id='photoInput'
						onChange={(e) => loadFile(e)}
					/>
					{imgDetails || userImage ? (
						<div className='flexRow alignCenter' style={{gap: '8px'}}>
							<button
								className='flexRow alignCenter subtitle-5 colorPrimaryMain'
								onClick={() => document.querySelector('#photoInput').click()}
							>
								<img src={cameraIcon} alt='' className='icon' />
								<Spacer x={0.8} />
								<span>Upload a new photo</span>
							</button>
              <div className='demacator'></div>
							<button
								className='flexRow alignCenter subtitle-5 colorPrimaryMain'
								onClick={() => {
									removeAvatar();
									setUserImage(null);
									setImgDetails(null);
								}}
							>
								<span>Remove</span>
							</button>
						</div>
					) : (
						<button
							className='flexRow alignCenter subtitle-5'
							onClick={() => document.querySelector('#photoInput').click()}
              style={{color: '#121212'}}
						>
							<img src={cameraIcon} alt='' className='icon' />
							<Spacer x={0.8} />
							<span>Upload a photo</span>
						</button>
					)}
					<Spacer y={0.4} />
					<p className='body-5 colorGrayScale'>
						Photos help your friends recognize you on Giftly
					</p>
				</div>
			</div>
			<Formik
				initialValues={{
					first_name: user?.first_name || '',
					last_name: user?.last_name || '',
					email: user?.email || '',
					username: user?.username || '',
				}}
				validationSchema={schema}
				onSubmit={async (values) => {
					await handleSave(values);
				}}
			>
				{({ handleSubmit, isSubmitting, isValid }) => (
					<FormWrapper onSubmit={handleSubmit}>
						<FormGroup
							fieldStyle='shortText'
							label='First name'
							name='first_name'
						/>
						<FormGroup
							fieldStyle='shortText'
							label='Last name'
							name='last_name'
						/>
						<FormGroup
							fieldStyle='shortText'
							type='email'
							label='Email address'
							name='email'
							className='spanFull'
						/>
						<div className='spanFull'>
							<FormGroup
								fieldStyle='shortText'
								label='Username'
								name='username'
							/>
							<span className='body-5 colorGrayScale'>
								You can only change your username once every 30 days
							</span>
						</div>

						{isSubmitting ? (
							<div className='flexRow justifyCenter spanFull'>
								<Loader />
							</div>
						) : (
							<div className='actionBtns spanFull'>
								<Button
									type='button'
									text='Cancel'
									className='border_dark'
									onClick={() => location.hash ? navigate(-2) : navigate(-1)}
									fullWidth
								/>
								<Button
									type='submit'
									text='Update profile'
									disabled={!isValid}
									fullWidth
								/>
							</div>
						)}
					</FormWrapper>
				)}
			</Formik>
		</div>
	);
};

export default ProfileDetailsTab;
