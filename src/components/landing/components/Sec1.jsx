import React from "react";
import Button from "components/global/Button";
import styled from "styled-components";
import hm_hero_1 from "../../../assets/images/hm_hero_1.png";
import wave1 from "../../../assets/images/wave1.svg";
import wave2 from "../../../assets/images/wave2.svg";

const Wrapper = styled.div`
	padding: 0 12rem;
	margin-top:6.553rem;
	position: relative;
	@media ( max-width: 460px){
			padding: 0 2rem;
		}



	}

	.header {
		display: flex;

		@media (max-width: 760px){
			flex-direction: column;
		}
	
	}
	.text {
		flex: 1;
		@media ( max-width: 760px){
			text-align:center;
		}
	}

	.title-plus {
		color: var(--white);
		.wish {
			color: var(--accent_1-light);
		}
		.friends {
			color: var(--primary-main);
		}
		@media (max-width: 760px) {
				font-size: 4.8rem;
                line-height: 5.6rem;
			}
	}

	.subtitle-2 {
		color: white;
		margin-top: 2.4rem;
	}

	.btn {
		width: 23.2rem;
		margin-top:4.8rem;
		margin-bottom:16.42rem;
		@media ( max-width: 760px){
			margin: 4.8rem auto;
		}
	}

	.imgWrapper {
		/* width: 64rem; */
		flex: 1;

		img,
		source {
			width: 100%;
		}
	
	}
	.wave1{
		position: absolute;
		bottom:0;
		left:0;
		width:19.438rem;
		height:17.3rem;
		@media ( max-width: 760px){
			display:none;
		}
	}
	.wave2{
		position: absolute;
		bottom:0;
		right:0;
		width:23.351rem;
		height:9.681rem;
		@media ( max-width: 760px){
			display:none;

	}
`;

const Sec1 = () => {
	return (
		<Wrapper>
			<div className="header">
				<div className="text">
					<h1 className="title-plus">
						Shoot a <span className="wish">Wish</span> and Share With{" "}
						<span className="friends">Friends!</span>
					</h1>
					<p className="subtitle-2">
						Create a wish list in minutes and share to your friends on your
						favourite platforms!
					</p>
					<Button className="btn" text="Create a Wish list for Free" />
				</div>
				<div className="imgWrapper">
					{/* Responsive image using art direction and resolution switching
                    Could not use Density switching because we do not have images of different image density */}
					{/* <picture>
						<source srcSet={hm_hero_1sm} media="(max-width:76em)" /> */}
					<img
						// srcSet={`${hm_hero_1} 639w`}
						// sizes="(max-width:144.0rem) 44vw, (max-width:76.0rem) 87vw, 63.9rem"
						alt="hm_hero_1"
						src={hm_hero_1}
					/>
					{/* </picture> */}
				</div>
			</div>
			<img className="wave1" src={wave1} alt="wave" />
			<img className="wave2" src={wave2} alt="wave" />
		</Wrapper>
	);
};

export default Sec1;
