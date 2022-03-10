import React from "react";
import styled from "styled-components";
import up_arrow_pink from "assets/icons/up_arrow_pink.svg";
import down_arrow from "assets/icons/down_arrow.svg";

const Wrapper = styled.div`
	position: relative;
	padding: 0 2.4rem;
	transition: all 0.3s;
	border-radius: 0.8rem;

    img{
        display: inline-block;
        margin: auto;
        align-self: center;
        height: 1.2rem;
        margin-left: 1.466rem;
    }

	p {
		margin-top: 1.6rem;
		height: 0;
		overflow: hidden;
		opacity: 0;
		color: var(--title-active);
		font-size: 1.8rem;
		line-height: 2.8rem;
	}

	&.open {
		background-color: var(--accent_2-main);

		padding: 2.4rem;
		h4 {
			color: var(--primary-main);
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

const Accordion = ({ question, answer, className }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Wrapper
			className={`${className || ""} ${isOpen ? "open" : ""}`}
			onClick={handleClick}
		>
			<h4 className="subtitle-2">
				{question}
				<img src={isOpen ? up_arrow_pink : down_arrow} alt="up_arrow_pink" />
			</h4>
			<p>{answer}</p>
		</Wrapper>
	);
};

export default Accordion;
