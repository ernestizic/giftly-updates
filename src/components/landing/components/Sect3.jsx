import Button from "components/global/Button";
import React from "react";
import styled from "styled-components";
import Card2 from "./Card2";
import wave3 from "assets/images/wave3.svg"
import wave4 from "assets/images/wave4.svg"

const Wrapper = styled.div`
	display: flex;
	background-color: var(--white);
	padding: 10.6rem 12rem 8rem;
	justify-content: space-between;
	position: relative;


.img__tp{
	position: absolute;
	top: 0;
	right:0;
	width: 27.9rem;
}
.img__btm{
	position: absolute;
    bottom: 1.973rem;
    left: 4rem;
	width: 20rem;
	z-index: 1;
	@media (max-width: 760px) {
		display: none;
	}
}

	@media (max-width: 760px) {
		flex-direction: column;
		padding: 16rem 2.4rem 9.7rem;
	}
	.text {
		max-width: 55rem;
		color: var(--title-active);

	@media (max-width: 760px) {
		margin:auto;
	}
		h1 {
			@media (max-width: 760px) {
				font-size: 4.8rem;
                line-height: 5.6rem;
                margin-top: 4.951rem
			}
			span {
				color: var(--primary-main);
			}
		}
		p {
			margin: 2.4rem 0 4.8rem;
		}

		@media (max-width: 760px) {
			width: auto;
			text-align: center;
			& > * {
				margin: auto;
			}
		}
	}
`;

const Sect3 = () => {
	return (
		<Wrapper>
			<img className="img__tp" src={wave3} alt="wave3" />
			<Card2 />
			<div className="text">
				<h1 className="title-plus">
					Build a list, <span>share</span> with ease.
				</h1>
				<p className="subtitle-2">
					Not just for birthdays! Create a wishlist for any special occasion and
					share with your family, friends and loved ones on any of these
					platforms.
				</p>
				<Button width="23.2rem" height="6.4rem" text="Sign up now" />
			</div>
			<img className="img__btm" src={wave4} alt="wave4" />
		</Wrapper>
	);
};

export default Sect3;
