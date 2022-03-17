import React from "react";
import styled from "styled-components";
import Nav from "components/global/Nav";
import Footer from "components/global/Footer";
import Accordion from "../global/Accordion";
import Nav2 from "./components/Nav2";
import data from "assets/data.json";

const Wrapper = styled.div`
	background-color: white;
	min-height: 100vh;
	padding: 0;
	margin: 0;

	.faqs-ctn {
		display: flex;
		padding-top: 9.6rem;
		padding-bottom: 9.6rem;
		@media (max-width: 760px) {
			display: block;
		}
	}
	color: var(--title-active);
	.acc,
	h1 {
		margin: 0 12rem;
		@media (max-width: 760px) {
			margin: 3.2rem 0;
		}
	}
	h1 {
		margin-bottom: 4.8rem;
		@media (max-width: 760px) {
			margin: 3.2rem 2.4rem;
		}
	}

	& > :last-child {
		margin-bottom: 0;
	}
`;

const FAQs = () => {
	return (
		<Wrapper>
			<Nav wt />
			<div className="faqs-ctn">
				<div className="faqs">
					<h1 className="title-2">FAQ</h1>
					{data.faqs.map((item, index) => (
						<Accordion
							key={index}
							className="acc"
							withPadding
							question={item.question}
							answer={item.answer}
						/>
					))}
				</div>
				<Nav2 />
			</div>

			<Footer />
		</Wrapper>
	);
};

export default FAQs;
