import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import instagram from "assets/icons/instagram_wt.svg";
import facebook from "assets/icons/facebook_wt.svg";
import twitter from "assets/icons/twitter_wt.svg";
import send from "assets/icons/send_wt.svg";
const Wrapper = styled.div`
	padding: 12rem 4.8rem;
	display: flex;
	font-size: 1.6rem;
	line-height: 2.4rem;
	background-color: var(--title-active);

	@media (max-width: 760px) {
		padding: 7.3rem 2.4rem;
		flex-direction: column;
		font-size: 1.4rem;
		line-height: 1.8rem;
	}

	justify-content: space-between;
	.logo {
		margin-bottom: 4rem;
	}
	.item_1 {
		width: 35rem;

		color: white;
		.media {
			margin-top: 4rem;
		}
		.icon {
			justify-content: center;
			height: 3.2rem;
			width: 3.2rem;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.1);
			display: inline-flex;
			margin-right: 1.6rem;
			img {
				width: 50%;
				height: 100%;
			}
		}
	}

	.item_2 {
		display: flex;
		margin-top: 5.1rem;

		color: white;

		@media (max-width: 760px) {
			flex-direction: column;
			font-size: 1.4rem;
			line-height: 1.8rem;
		}

		& > :first-child {
			width: 16rem;
			p {
				margin-bottom: 1.2rem;
			}
		}
		div + div {
			margin-left: 3rem;

			@media (max-width: 760px) {
				margin-left: 0;
			}
		}

		form {
			margin-top: 2.4rem;
		}
	}

	form {
		height: 4rem;
		width: 26.5rem;
		position: relative;

		input {
			height: 100%;
			width: 100%;
			background-color: rgba(255, 255, 255, 0.2);
			color: white;
			border: none;
			outline: none;
			border-radius: 0.8rem;
			padding: 0 1.2rem;
			::placeholder {
				color: white;
			}
		}

		img {
			position: absolute;
			top: 1.26rem;
			right: 1.36rem;
			height: 1.48rem;
			width: 1.48rem;
		}
	}
`;

const MEDIA = [
	{
		icon: instagram,
		name: "instagram",
		link: "https://instagram.com/giftlydotme",
	},
	{
		icon: facebook,
		name: "facebook",
		link: "https://facebook.com/giftlydotme",
	},
	{
		icon: twitter,
		name: "twitter",
		link: "https://twitter.com/giftlydotme",
	},
];

const Footer = () => {
	return (
		<Wrapper>
			<div className="item_1">
				<Logo className="logo" />
				<p style={{ marginBottom: "0.8rem" }}>
					❤️ Giftly is a platform that makes it easy
				</p>
				<p>
					Giftly is a platform that makes it easy for your friends to get you
					the best gifts. Create your wish lists and share them with your
					friends.
				</p>
				<p className="media">
					{MEDIA.map((ele, index) => (
						<a
							key={index}
							className="icon"
							href={ele.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src={ele.icon} alt={ele.name} />
						</a>
					))}
				</p>
			</div>
			<div className="item_2">
				<div>
					<p>Find friends</p>
					<p>FAQs</p>
					<p> Terms of use</p>
					<p>Privacy policy </p>
				</div>
				<div>
					<p>Sign up to our newsletter</p>
					<form action="">
						<input placeholder="Your email address" type="text" />
						<img src={send} alt="send" />
					</form>
				</div>
			</div>
		</Wrapper>
	);
};

export default Footer;
