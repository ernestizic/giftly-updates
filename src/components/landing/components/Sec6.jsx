import React from "react";
import styled from "styled-components";
import hm_hero_3 from "assets/images/hm_hero_3.png";
import Button from "components/global/Button";

const Wrapper = styled.div`
	color: var(--white);
	display: flex;
	@media (max-width: 760px) {
		flex-direction: column;
	}
	h1 {
		.fr {
			color: var(--accent_1-light);
		}
		.sd {
			color: var(--primary-main);
		}
        @media (max-width: 760px){
            font-size: 4.8rem;
            line-height: 4.8rem;
        }
	}
	& > div {
		/* width: 50%; */
		flex: 1;
		img {
			width: 100%;
		}
	}
	& > div:last-child {
		padding: 15.4rem 0;

		& > * {
			width: 66.38%;
			margin: auto;
			@media (max-width: 760px) {
				width: 67%;
				text-align: center;
				button {
					margin: auto;
				}
			}
			@media (max-width: 570px) {
				width: 87.2%;
			}
		}

		p {
			margin: 2.4rem auto 4.8rem;
		}
	}
`;

const Sec6 = () => {
	return (
		<Wrapper>
			<div>
				<img src={hm_hero_3} alt="hm_hero_3" />
			</div>
			<div>
				<h1 className="title-plus">
					No more <span className="fr">bad</span>{" "}
					<span className="sd">gifts</span>
				</h1>
				<p className="subtitle-2">
					When it comes to gift-giving, forget trying to read minds. Now relax,
					put your feet up. You’ll never have to worry about finding or
					receiving the perfect gift again!
				</p>
				<div>
					<Button width="18rem" height="6.4rem" text="Create a wishlist" />
				</div>
			</div>
		</Wrapper>
	);
};

export default Sec6;
