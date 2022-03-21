import React from "react";
import Button from "components/global/Button";
import styled from "styled-components";
import hm_hero_1 from "../../../assets/images/hm_hero_1.png";
import wave1 from "../../../assets/images/wave1.svg";
import wave2 from "../../../assets/images/wave2.svg";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
	padding: 0 12rem;
	padding-bottom: 120px;
	margin-top:6.553rem;
	position: relative;
	
h1{
	color: white;
	font-size: 9.6rem;
	line-height: 9.6rem;
	@media (max-width: 1200px){
		font-size: 7.2rem;
	line-height: 8rem;
	width: 31rem;
	}
	@media (max-width: 1060px){
		font-size: 5rem;
	line-height: 5rem;
	width: 22rem;
	}
	@media (max-width: 768px){
		font-size: 4.8rem;
	line-height: 4.8rem;
	width: auto;
	max-width: 32.7rem; 
	text-align: center;
	margin: auto;
	}
}

	@media ( max-width: 1200px){
			padding: 0 8rem;
		}
	@media ( max-width: 1060px){
			padding: 0 4rem;
		}
	@media ( max-width: 460px){
			padding: 0 2rem;
		}



	}

	.header {
		display: flex;
		align-items: center;

		@media (max-width: 768px){
			flex-direction: column;
		}
	
	}
	.text {
		flex: 1;
		@media ( max-width: 768px){
			text-align:center;
		}
	}

	.title-1 {
		color: white;
		.bad {
			color: var(--accent_1-light);
		}
		.gifts {
			color: var(--primary-main);
		}
		@media (max-width: 768px) {
				font-size: 4.8rem;
                line-height: 5.6rem;
			}
	}

	.subtitle-2 {
		color: white;
		margin-top: 2.4rem;
		width: 39rem;
		@media ( max-width: 1060px){
			font-size: 1.7rem;
			width: auto;
			   max-width: 30rem;
		}
		@media ( max-width: 768px){
			max-width: 32.7rem;
				text-align: center;
				font-size: 1.6rem;
				line-height: 2.4rem;
				margin:2.4rem auto 4.8rem;

		}
	}

	.btn {

		margin-top:6.4rem;
		// width: 23.2rem;
		height: 6.4rem;
		// white-space: normal;
		padding: 0 2.8rem;

		@media ( max-width: 1060px){
			margin-top:3.2rem;
			margin-bottom:15rem;

		}

		@media ( max-width: 768px){
			margin: 4.8rem auto;
			height: 4.8rem;
		white-space: nowrap;
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
		@media ( max-width: 768px){
			display:none;
		}
	}
	.wave2{
		position: absolute;
		bottom:0;
		right:0;
		width:23.351rem;
		height:9.681rem;
		@media ( max-width: 768px){
			display:none;

	}
`;

const Sec1 = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="header">
        <div className="text">
          <h1 className="title-1">
            No more <br />
            <span className="bad">bad</span>
            <span className="gifts"> gifts</span>
          </h1>
          <p className="subtitle-2">
            Get the best gifts from your best people, create a wish list in
            minutes and share to your friends on your favourite platforms!
          </p>
          <Button
            className="btn large"
            text="Create a Wish list for Free"
            onClick={() => navigate("/home/new-wishlist")}
          />
        </div>
        <div className="imgWrapper">
          <img alt="hm_hero_1" src={hm_hero_1} />
        </div>
      </div>
      <img className="wave1" src={wave1} alt="wave" />
      <img className="wave2" src={wave2} alt="wave" />
    </Wrapper>
  );
};

export default Sec1;
