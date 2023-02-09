import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Loader from 'components/global/Loader';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'components/global/Button';
import FormGroup from 'components/global/FormGroup';
import FormWrapper from 'components/global/FormWrapper';
import { base_url } from 'utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from 'features/auth/authSlice';
import { setAlert } from 'features/alert/alertSlice';

const PasswordTab = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();

    // Password submission
	const submitPassword = async (formData) => {
		try {
			const res = await axios.patch(
				`${base_url}/user/password/update`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = res.data;
			dispatch(setToken(data.data.token.token));
            dispatch(
                setAlert({
                    type: 'success',
                    message: data.message,
                })
            )
		} catch (e) {
            dispatch(
                setAlert({
                    type: 'error',
                    message: e.response.data.message,
                })
            )
		}
	};

	// Form validation
	let validationSchema = Yup.object().shape({
		current_password: Yup.string()
			.min(8, 'Your password must contain at least 8 characters.')
			.required('Enter your current password'),
		password: Yup.string()
			.min(8, 'Your password must contain at least 8 characters.')
			.required('Please enter password')
			.notOneOf(
				[Yup.ref('current_password'), null],
				'New password is same with old password'
			),
		password_confirmation: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords do not match')
			.required('Field cannot be empty'),
	});

	return (
		<div>
			<Formik
				initialValues={{
					current_password: '',
					password: '',
					password_confirmation: '',
				}}
				validationSchema={validationSchema}
				onSubmit={async(values) => {
					await submitPassword(values);
				}}
			>
				{({ handleSubmit, isSubmitting, isValid, dirty }) => (
					<FormWrapper onSubmit={handleSubmit}>
						<FormGroup
							fieldStyle='shortText'
							type='password'
							label='Current password'
							name='current_password'
							className='password spanFull'
						/>
						<FormGroup
							fieldStyle='shortText'
							type='password'
							label='New password'
							name='password'
							className='password spanFull'
						/>
						<FormGroup
							fieldStyle='shortText'
							type='password'
							label='Confirm password'
							name='password_confirmation'
							className='password spanFull'
						/>

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
									onClick={() => (location.hash ? navigate(-2) : navigate(-1))}
									fullWidth
								/>
								<Button
									type='submit'
									text='Save Changes'
									disabled={!(isValid && dirty)}
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

export default PasswordTab;
