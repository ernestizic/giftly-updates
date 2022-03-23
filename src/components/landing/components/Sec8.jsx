import React from "react";
import styled from "styled-components";
import bg from "assets/images/faq.png";
import bg_sm from "assets/images/faq_sm.png";

import Button from "components/global/Button";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
	position: relative;
	padding: 8.8rem 12rem;
	background-image: ${`url(${bg})`};
	background-size: cover;
	@media (max-width: 760px) {
		background-image: ${`url(${bg_sm})`};
	}

	overflow: hidden;
	display: flex;
	height: fit-content;
	
	@media (min-width: 1440px){
		justify-content: center;
	}

	h1 {
		color: var(--accent_2-main);
	}

	img {
		width: 100%;
	}

	.text {
		@media (min-width: 1440px){
		width: 687px;
	}
		p {
			position: relative;
			color: white;
			margin-top: 1.6rem;
		}
	}

	button {
		margin: auto 0 auto auto;
		position: relative;
		height: 6.4rem;
		@media (min-width: 1440px){
		margin-left: 313px;
	}
	}

	@media (max-width: 1200px) {
		padding: 8.8rem 8rem;

		h1 {
			font-size: 4.8rem;
			line-height: 5.6rem;
		}
	}

	@media (max-width: 1000px) {
		padding: 7rem 6rem;

		h1 {
			font-size: 3.6rem;
			line-height: 4.8rem;
		}

		p {
			font-size: 1.6rem;
			line-height: 2rem;
		}
		button {
			height: 4.8rem;
		}
	}

	@media (max-width: 768px) {
		padding: 6.1rem 0;
		flex-direction: column;
		text-align: center;

		p {
			margin: 0.8rem auto 3rem;
			font-size: 1.4rem;
			line-height: 1.8rem;
			width: 28.8rem;
		}

		button {
			margin: auto;
		}

		.title {
			font-size: 2.4rem;
			line-height: 3.6rem;
		}
	}
`;

const Sec8 = () => {
	const navigate = useNavigate();
	return (
		<Wrapper>
			<div className="text">
				<h1 className="title-1 title">Get started for free now.</h1>
				<p className="subtitle-2 subtitle">
					Let friends and family know the gifts you truly want and need.
				</p>
			</div>
			<Button
				width="20rem"
				text="Sign me up"
				onClick={() => navigate("sign-up")}
			/>
		</Wrapper>
	);
};

export default Sec8;
