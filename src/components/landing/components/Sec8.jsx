import React from "react";
import styled from "styled-components";
import hm_hero_2 from "assets/images/hm_hero_2.png";
import curve1 from "assets/images/curve1.svg";
import curve2 from "assets/images/curve2.svg";
import curve3 from "assets/images/curve3.svg";
import curve4 from "assets/images/curve4.svg";
import Button from "components/global/Button";

const Wrapper = styled.div`
	position: relative;
	padding: 9.6rem 12rem;
	overflow: hidden;
	@media (max-width: 760px) {
		padding: 4.8rem 2.4rem;
	}
	background-color: var(--accent_2-main);
	& > div {
		display: flex;
		border-radius: 0.8rem;
		background-color: var(--title-active);
		padding: 9.6rem;
		height: fit-content;
		@media (max-width: 760px) {
			flex-direction: column;
			padding: 1.5rem;
		}

		h1 {
			color: var(--primary-light);
			z-index: 3;
			@media (max-width: 760px) {
				font-size: 4.8rem;
				line-height: 5.6rem;
			}
		}
		img {
			width: 100%;
		}
		.cur1 {
			top: 9.6rem;
			left: 12rem;
			height: 45rem;
			position: absolute;
		}
		.cur2 {
			top: 9.6rem;
			left: 12rem;
			position: absolute;
		}
		.cur3 {
			top: 9rem;
			left: 29rem;
			position: absolute;
		}
		.cur4 {
			bottom: 9.6rem;
			right: 12rem;
			position: absolute;
		}

		[class*="cur"] {
			display: none;
		}

		.text {
			width: 59.8rem;
			@media (max-width: 760px) {
				width: auto;
			}
			p {
				position: relative;
				color: var(--white);
				margin-left: auto;
				width: 35.3rem;
				margin-top: 2.4rem;

				@media (max-width: 760px) {
				width: auto;
				text-align: right;

				}
			}
			h1 {
				position: relative;
			}
		}
		button {
			margin: auto 0 auto auto;
			position: relative;
			@media (max-width: 760px) {
				/* width: auto; */
				margin: 4.8rem auto 4rem;
				height: 4.8rem;

				}
		}
	}
`;

const Sec8 = () => {
	return (
		<Wrapper>
			<div>
				<div className="cur1">
					<img src={curve1} alt="curve" />
				</div>
				<div className="cur2">
					<img src={curve2} alt="curve" />
				</div>
				<div className="cur3">
					<img src={curve3} alt="curve" />
				</div>
				<div className="cur4">
					<img src={curve4} alt="curve" />
				</div>
				<div className="text">
					<h1 className="title-plus">Get started for free now.</h1>
					<p className="subtitle-2">
						Let friends and family know the gifts you truly want and need.
					</p>
				</div>
				<Button height="6.4rem" width="200px" text="Sign me up" />
			</div>
		</Wrapper>
	);
};

export default Sec8;
