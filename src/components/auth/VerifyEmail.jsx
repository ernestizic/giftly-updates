import { VerifyEmailContainer } from './AuthStyles';
import React, { useState } from 'react';
import Logo from 'assets/images/logo.svg'
import Spacer from 'components/global/Spacer';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { base_url } from "utils/utils";
import axios from 'axios';
import { useDispatch } from "react-redux";
import Button from 'components/global/Button';

import {setAlert} from "features/alert/alertSlice";

const VerifyEmail = () => {
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch();
	const userEmail = localStorage.getItem("userRegistrationEmail")
	const navigate = useNavigate();
	const { search } = useLocation();
	const user = useSelector((state) => state.auth.user);
	const fromSite = new URLSearchParams(search).get('from');
	const fromTrigger = () => {
		if (!fromSite) return;
		document.querySelector('#fromTrigger').classList.add(fromSite);
		document.querySelector('#fromTrigger').click();
	};

	useEffect(() => {
		fromTrigger();
		// eslint-disable-next-line
	}, []);

	const resendEmail =async()=> {
		setIsLoading(true)
		try {
			const res = await axios.post(`${base_url}/auth/email/verify/resend/${userEmail}`)
			const data = res.data
			dispatch(setAlert({
				type: 'success',
				message: data.message
			}))
			setIsLoading(false)
		} catch (err) {
			dispatch(setAlert({
				type: 'error',
				message: err.response.data.message || "Something went wrong"
			}))
			setIsLoading(false)
		}
	}

	return (
		<VerifyEmailContainer>
			<Button
				bg="#fff"
				text="Go back to site"
				className='back-btn'
				onClick={() => navigate('/home/login')}
			/>
			<div>
				<img src={Logo} alt='logo' height='50px' width='auto' />
				<Spacer y={1.2} />
				<h1 className='colorWhite'>Hello {user?.first_name || ''}, Welcome to Giftly 🎉</h1>
				<Spacer y={1.2} />
				<p>
					To continue using Giftly, head over to your inbox and click on the
					verification link we just sent you.
				</p>

				<Button 
					type='button' 
					loading={isLoading} 
					text='Resend email' 
					bg='inherit' 
					className='text-type'
					onClick={resendEmail} 
				/>
			</div>
			{/* <button id='fromTrigger'>...</button> */}
		</VerifyEmailContainer>
	);
};

export default VerifyEmail;
