import React from "react";
import styled from "styled-components";
import Nav from "components/global/Nav";
import Footer from "components/global/Footer";
import Accordion from "../global/Accordion";
import Nav2 from "./components/Nav2";

const Wrapper = styled.div`
	background-color: var(--white);
	min-height: 100vh;
	padding: 0;
	margin: 0;

	.faqs-ctn {
		display: flex;
		padding-top: 9.6rem;
		@media (max-width: 760px) {
			display: block;
		}

	
	}
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
			" Once you have signed up and created your wish list, all you have to do is share your wish list link on your email or social media sites.",
	},
	{
		question: "How do I sign up for Giftly?",
		answer:
			"It is quite easy to sign up for Giftly. You can sign up through Google or fill the sign-up form.The form requires you to input your details, including your: *Name (First and Last) *Email address*Phone number*Password ",
	},
	{
		question: "How do I add an item to my wish list?",
		answer:
			"You can add items to your wish list once you click on ‘Create wish list.’ After adding an item, include a link to purchase the item. To add an item to your wish list after creating the wish list, click on ‘Add item.’ ",
	},
	{
		question: "How many wish lists can I create?",
		answer:
			"You can create multiple wish lists for various occasions on Giftly. You can also add as many items as you want to your wish list.",
	},
	{
		question: "What if my friends pick the same item on my wish list?",
		answer:
			"You don’t have to worry about your friends picking the same item on your wish list. Once an item has been claimed, it gets ticked off your wish list. ",
	},
	{
		question: "How do I know who has claimed items on my wish list?",
		answer:
			" Unfortunately, you cannot see the people who have claimed items on your list. They would remain anonymous unless they chose to inform you through other means.    ",
	},
	{
		question: "Who can see my wish list?",
		answer:
			"Your wish list is visible to people who have your username and search for it. You can also lock your wish list and unlock it with a passcode.",
	},
	{
		question: "How do I find someone on Giftly?",
		answer:
			" To search for a profile on Giftly, you need to know their specific username. Once you find them, you can view their wish list, except it's on lock mode.Alternatively, if they have shared their wish list link with you, click on it, and it will direct you to their wish list.",
	},
	{
		question: "What happens if I forget my password?",
		answer:
			" If you happen to forget your account password, click on ‘Change Password,’ you'll receive an email to verify your password change.",
	},
	{
		question: "Do I have to drop the URL of an item?",
		answer:
			"No, you don't need to input a link for an item. It is, however, advisable to add a link if you can. Adding a link will make the purchasing process easy for your friends. ",
	},
	{
		question: "Do my friends need a Giftly account to view my wish list?",
		answer:
			"No, your friends do not have to be on Giftly to view and claim items on your wish list. ",
	},
	{
		question: "Do I have to drop the URL of an item?",
		answer:
			"You can choose to delete a wish list you no longer require. You can also edit the details of the wish list. ",
	},

	{
		question: "What happens when I’m done with a wish list?",
		answer:
			"You can choose to delete a wish list you no longer require. You can also edit the details of the wish list. ",
	},
	{
		question: "For what occasions can I create a wish list?",
		answer:
			"You can create a wish list for several occasions, including but not limited to; birthdays, baby and bridal showers, Secret Santa, private get-togethers, to mention a few. ",
	},
];

const FAQs = () => {
	return (
		<Wrapper>
			<Nav wt />
			<div className="faqs-ctn">
				<div className="faqs">
					<h1 className="title-2">FAQ</h1>
					{FAQS.map((item, index) => (
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
