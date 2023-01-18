import { VerifyEmailContainer } from './AuthStyles';
import React from 'react';
import Logo from 'assets/images/logo.svg'
import Spacer from 'components/global/Spacer';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VerifyEmail = () => {
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

	return (
		<VerifyEmailContainer>
			<button className='back-btn' onClick={() => navigate('/home/login')}>
				Go back to site
			</button>
			<div>
				<img src={Logo} alt='logo' height='50px' width='auto' />
				<Spacer y={1.2} />
				<h1 className='colorWhite'>Hello {user?.first_name || ''}, Welcome to Giftly 🎉</h1>
				<Spacer y={1.2} />
				<p>
					To continue using Giftly, head over to your inbox and click on the
					verification link we just sent you.
				</p>

				<button type='button'>Resend email</button>
			</div>
			{/* <button id='fromTrigger'>...</button> */}
		</VerifyEmailContainer>
	);
};

export default VerifyEmail;
