import React from "react";
import styled from "styled-components";
import star from "assets/icons/star.svg";

const Wrapper = styled.div`
	overflow: hidden;
	position: relative;
	height: 72rem;
	padding: 9.6rem 0;
	/* .bg {
		display: none;
	} */

	/* @media (min-width: 1440) {
		.bg {
			display: block;
		}
		.ctn {
			display: none;
		}
	} */

	@media (max-width: 1200px) {
		height: 54rem;
		padding: 8rem 0;
	}
	@media (max-width: 900px) {
		height: 52rem;
		padding: 7.5rem 0;
	}
	@media (max-width: 800px) {
		height: 40rem;
	}

	.mb {
		height: 100%;
		display: none;
		margin: auto;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		color: white;
		@media (max-width: 768px) {
			display: flex;
		}
	}
	.ctn {
		color: white;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 100%;

		p {
			font-size: 9.1rem;
			line-height: 9.1rem;
			display: flex;
			justify-content: space-between;
			width: 100%;
			img {
				width: 5.6rem;
				height: 5.6rem;
			}

			@media (max-width: 1300px) {
				font-size: 8.1rem;
				line-height: 8.1rem;
				img {
					width: 4.5rem;
					height: 4.5rem;
				}
			}
			@media (max-width: 1200px) {
				font-size: 7.6rem;
				line-height: 7.6rem;
			}
			@media (max-width: 1100px) {
				font-size: 6.8rem;
				line-height: 6rem;
				img {
					width: 3.8rem;
					height: 3.8rem;
				}
			}
			@media (max-width: 1000px) {
				font-size: 6.1rem;
				line-height: 6.1rem;
			}
			@media (max-width: 900px) {
				font-size: 5rem;
				line-height: 5rem;
				img {
					width: 2.8rem;
					height: 2.8rem;
				}
			}
			@media (max-width: 800px) {
				font-size: 4.5rem;
				line-height: 4.5rem;
			}
		}

		@media (max-width: 768px) {
			display: none;
		}
	}

	p {
		@media (max-width: 768px) {
			font-size: 48px;
			line-height: 48px;
		}

		display: flex;
		img {
			width: 5.6rem;
			height: 5.6rem;
			margin: 0 2rem;
			@media (max-width: 768px) {
				margin: 0 auto;
			}
			padding: 0;
			display: inline-block;
			align-self: center;
		}
		span {
			width: fit-content;
		}
	}

	.title-1 {
		width: max-content;
		white-space: nowrap;
	}

	@media screen and (max-width: 768px) {
		padding: 48px 0;
		height: auto;

		.mb {
			gap: 32px;
			justify-content: center;
			p {
				width: 100%;
				img {
					height: 3.2rem;
					width: 3.2rem;
				}
			}
		}
	}
`;
const Star = () => <img src={star} alt="start" />;

const Sec4 = () => {
	return (
		<Wrapper>
			{/* <div className="bg">
				<h1>Hellllllllllllllllllllllll</h1>
			</div> */}
			<div className="ctn">
				<p className="title-1">
					<span>Birthdays</span> <Star />
					<span>Secret Santa</span>
					<Star /> <span>Wed</span>
				</p>
				<p className="title-1">
					<span>Shower</span> <Star />
					<span>housewarming</span>
					<Star /> <span>Chris</span>
				</p>
				<p className="title-1">
					<span>Office send-offs</span> <Star /> <span>Retirement pa</span>
				</p>
				<p className="title-1">
					<span>versary</span> <Star />
					<span>Graduations</span> <Star />
					<span>Anythin</span>
				</p>
			</div>
			<div className="mb">
				<p className="title-1">
					Birthdays <Star />
					Secr
				</p>
				<p className="title-1">
					Shower <Star />
					Weddings
				</p>
				<p className="title-1">
					Birthdays
					<Star />
					Secr
				</p>
				<p className="title-1">
					Shower <Star />
					Weddings
				</p>
			</div>
		</Wrapper>
	);
};

export default Sec4;
