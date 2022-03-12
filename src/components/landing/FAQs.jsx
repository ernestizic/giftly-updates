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
	.acc,
	h1 {
		margin: 3.2rem 12rem;
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
			"Once you have signed up and created your wish list, all you have to do is share your wish list link on your email or social media sites.",
	},
	{
		question: "How do I sign up for Giftly?",
		answer:
			" You can start creating your wish list once you sign up on Giftly. Alternatively, you can also create a wish list and sign up to Giftly later.Getting Started:Click on the wish list creation form *Name your wish list*Add items and links*You will only be able to share your wish list if you have signed up for Giftly.",
	},
	{
		question: "How do I add an item to my wish list?",
		answer:
			"It is quite easy to sign up for Giftly. You can sign up through Google or fill the sign-up form *The form requires you to input your details, including your:* Name (First and Last) *Phone number*Password *After the sign-up, you’ll get a verification email. Once your email is verified, you will be directed to your dashboard, and you can start creating wish lists.",
	},
	{
		question: "How many wish lists can I create?",
		answer:
			"You can add items to your wish list once you click on ‘Create wish list.’ After adding an item, include a link to purchase the item. To add an item to your wish list after creating the wish list, click on ‘Add item.	",
	},
	{
		question: "What if my friends pick the same item on my wish list?",
		answer:
			"You can create multiple wish lists for various occasions on Giftly. You can also add as many items as you want to your wish list.",
	},
	{
		question: "How do I know who has claimed items on my wish list?",
		answer:
			"You don’t have to worry about your friends picking the same item on your wish list. Once an item has been claimed, it gets ticked off your wish list. ",
	},
	{
		question: "Who can see my wish list?",
		answer: "",
	},
	{
		question: "How do I find someone on Giftly?",
		answer: "",
	},
	{
		question: "What happens if I forget my password?",
		answer: "",
	},
	{
		question: "Do I have to drop the URL of an item?",
		answer: "",
	},
	{
		question: "Do my friends need a Giftly account to view my wish list?",
		answer: "",
	},
	{
		question: "Do I have to drop the URL of an item?",
		answer: "",
	},
	{
		question: "Do my friends need a Giftly account to view my wish list?",
		answer: "",
	},
	{
		question: "What happens when I’m done with a wish list?",
		answer: "",
	},
	{
		question: "For what occasions can I create a wish list?",
		answer: "",
	},
];

const FAQs = () => {
	return (
		<Wrapper>
			<Nav wt />
			<h1 className="title-2">FAQ</h1>
			{FAQS.map((item) => (
				<Accordion
					className="acc"
					withPadding
					question={item.question}
					answer={item.answer}
				/>
			))}

			<Footer />
		</Wrapper>
	);
};

export default FAQs;
