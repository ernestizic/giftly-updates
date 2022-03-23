import React from "react";
import styled from "styled-components";
import up_arrow_pink from "assets/icons/up_arrow_pink.svg";
import down_arrow from "assets/icons/down_arrow.svg";

const Wrapper = styled.div`
	position: relative;
	padding: ${(props) => (props.withPadding ? "0 " : "0 2.4rem")};
	@media (max-width: 768px) {
		padding: 0 2.4rem;
	}
	transition: all 0.3s;
	border-radius: 0.8rem;

	img {
		display: inline-block;
		margin: auto;
		align-self: center;
		height: 1.2rem;
		margin-left: 1.466rem;
	}

	h4 {
		color: var(--title-active);
		font-size: 2rem;
		line-height: 3.2rem;
		@media (max-width: 768px) {
			font-size: 1.6rem;
			line-height: 2.4rem;
		}
	}

	p {
		margin-top: 1.6rem;
		height: 0;
		overflow: hidden;
		opacity: 0;
		color: var(--title-active);
		font-size: 1.8rem;
		line-height: 2.8rem;
		@media (max-width: 768px) {
			font-size: 1.4rem;
			line-height: 1.8rem;
		}
	}

	&.open {
		background-color: var(--accent_2-main);

		padding: 2.4rem;
		h4 {
			color: var(--primary-main);

			/* @media (max-width: 768px) {
				font-size: 1.6rem;
				line-height: 2.4rem;
			} */
		}

		p {
			margin-top: 1.6rem;
			height: auto;
			overflow: hidden;
			opacity: 1;
			margin-bottom: 0;
		}
	}
`;

const Accordion = ({ question, answer, className, withPadding }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Wrapper
			withPadding={withPadding}
			className={`${className || ""} ${isOpen ? "open" : ""}`}
			onClick={handleClick}
		>
			<h4>
				{question}
				<img src={isOpen ? up_arrow_pink : down_arrow} alt="up_arrow_pink" />
			</h4>
			<p>{answer}</p>
		</Wrapper>
	);
};

export default Accordion;
