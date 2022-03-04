import Button from "components/global/Button";
import React from "react";
import styled from "styled-components";
import hm_hero_1 from "../../assets/images/hm_hero_1.png";
import hm_hero_1sm from "../../assets/images/hm_hero_1sm.png";

const Wrapper = styled.div`
	padding: 0 12rem;

	@media (max-width: 1260px) {
		padding: 0 9rem;
		.title-plus {
			font-size: 9rem;
		}
	}
	@media (max-width: 1110px) {
		padding: 0 7.7rem;
		.title-plus {
			font-size: 8rem;
		}
	}
	@media (max-width: 1000px) {
		padding: 0 6rem;
		.title-plus {
			font-size: 7rem;
		}
	}
	@media (max-width: 860px) {
		padding: 0 4rem;
		.title-plus {
			font-size: 6.6rem;
		}
	}
	@media (max-width: 760px) {
		padding: 0;
		.title-plus {
			font-size: 6.6rem;
		}
	}

	.header {
		display: flex;
		@media (max-width: 760px) {
			flex-direction: column;
			h1 {
				text-align: center;
				width: 70%;
				margin: auto;
				font-size: 6rem;
				line-height: 5.8rem;
			}
		}
		@media (max-width: 530px) {
			flex-direction: column;
			h1 {
				text-align: center;
				width: 70%;
				margin: auto;
				font-size: 4.5rem;
				line-height: 2.8rem;
			}
		}
	}
	.text {
		/* width: 38.19%; */
		flex: 1;
	}

	.title-plus {
		color: var(--white);
		.wish {
			color: var(--accent_1-light);
		}
		.friends {
			color: var(--primary-main);
		}
	}

	.subtitle-2 {
		color: white;
	}

	.btn {
		width: 23.2rem;
	}

	.imgWrapper {
		/* width: 64rem; */
		flex: 1;

		img,
		source {
			width: 100%;
		}
		/* picture{
            border-color: red;

        } */
	}
`;

export const Home = () => {
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
					<picture>
						<source srcSet={hm_hero_1sm} media="(max-width:76em)" />
						<img
							// srcSet={`${hm_hero_1} 639w`}
							// sizes="(max-width:1440px) 44vw, (max-width:760px) 87vw, 639px"
							alt="hm_hero_1"
							src={hm_hero_1}
						/>
					</picture>
				</div>
			</div>
		</Wrapper>
	);
};
