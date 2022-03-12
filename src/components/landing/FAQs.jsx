import React from "react";
import styled from "styled-components";
import Nav from "components/global/Nav";
import Footer from "components/global/Footer";
import Accordion from "../global/Accordion";

const Wrapper = styled.div`
	background-color: var(--white);
	min-height: 100vh;
	padding: 0;
	margin: 0;

	color: var(--title-active);
	.acc,h1{
		margin:3.2rem  12rem;
		@media (max-width: 760px){
			margin: 3.2rem 0;
		}
	}
h1{
	margin-bottom: 4.8rem;
	@media (max-width: 760px){
			margin: 3.2rem 2.4rem;
		}
}

	& > :last-child {
		margin-bottom: 0;
		/* border: 3px solid red; */
	}
`;
const FAQS = [
	{
		question: "What is Giftly?",
		answer:
			"Giftly is a platform that makes it easy for your friends to get you the best gifts. Create your wish lists and share them with your friends.",
	},
	{
		question: "How can I share my wish lists?",
		answer:
			"",
	},
	{
		question: "How do I sign up for Giftly?",
		answer:
			"",
	},
	{
		question: "How do I add an item to my wish list?",
		answer:
			"",
	},
	{
		question: "How many wish lists can I create?",
		answer:
			"",
	},
	{
		question: "What if my friends pick the same item on my wish list?",
		answer:
			"",
	},
	{
		question: "How do I know who has claimed items on my wish list?",
		answer:
			"",
	},
	{
		question: "Who can see my wish list?",
		answer:
			"",
	},
	{
		question: "How do I find someone on Giftly?",
		answer:
			"",
	},
	{
		question: "What happens if I forget my password?",
		answer:
			"",
	},
	{
		question: "Do I have to drop the URL of an item?",
		answer:
			"",
	},
	{
		question: "Do my friends need a Giftly account to view my wish list?",
		answer:
			"",
	},
	{
		question: "Do I have to drop the URL of an item?",
		answer:
			"",
	},
	{
		question: "Do my friends need a Giftly account to view my wish list?",
		answer:
			"",
	},
	{
		question: "What happens when I’m done with a wish list?",
		answer:
			"",
	},
	{
		question: "For what occasions can I create a wish list?",
		answer:
			"",
	},
];

const FAQs = () => {
	return (
		<Wrapper>
			<Nav wt />
			<h1 className="title-2">FAQ</h1>
			{FAQS.map((item) => (
				<Accordion className='acc' withPadding question={item.question} answer={item.answer} />
			))}

			<Footer />
		</Wrapper>
	);
};

export default FAQs;
