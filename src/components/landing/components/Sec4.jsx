import React from "react";
import styled from "styled-components";
import star from "assets/icons/star.svg";

const Wrapper = styled.div`
	overflow: hidden;
	position: relative;
	height: 72rem;
	padding: 9.6rem 0;

	.mb {
		height: 100%;
		display: none;
		margin: auto;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		color: white;
		@media (max-width: 760px) {
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

		p{
			font-size: 9.1rem;
			line-height: 9.1rem;
		}

		@media (max-width: 760px) {
			display: none;
		}
	}

	p {
		@media (max-width: 760px) {
			font-size: 48px;
			line-height: 48px;
		}

		display: flex;
		img {
			width: 5.6rem;
			height: 5.6rem;
			margin: 0 2rem;
			@media (max-width: 760px) {
				margin: 0 auto;
			}
			padding: 0;
			display: inline-block;
			align-self: center;
		}
		span {
			width: fit-content;
			display: inline-block;
		}
		.shift {
			/* margin-left: -1.8rem; */
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
		}
	}
`;
const Star = () => <img src={star} alt="start" />;

const Sec4 = () => {
	return (
		<Wrapper>
			<div className="ctn">
				<p className="title-1">
					<span>Birthdays</span> <Star />
					<span>Secret Santa</span>
					<Star /> <span>Wed</span>
				</p>
				<p className="title-1">
					<span className="shift">Shower</span> <Star />
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
					SecretSanta
				</p>
				<p className="title-1">
					Baby Shower <Star />
					Weddings
				</p>
				<p className="title-1">
					Birthdays
					<Star />
					Secret Santa
				</p>
				<p className="title-1">
					Baby Shower <Star />
					Weddings
				</p>
			</div>
		</Wrapper>
	);
};

export default Sec4;
