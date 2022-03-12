import Footer from "components/global/Footer";
import Nav from "components/global/Nav";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const details = [
	`“Affiliate” means an entity that controls is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for the election of directors or other managing authority.`,
	`“Account” means an individual account created for You to access our Service or parts of our Service.`,
	`“Company” (referred to as either "the Company," "We", "Us," or "Our" in this Agreement) refers to [GIFTLY].`,
	`“Content” refers to content such as text, images, or other information that can be posted, uploaded, linked to, or otherwise made available by You, regardless of the form of that content.`,
	`“Device” means any device that can access the Service, such as a computer, a cell phone, or a digital tablet. `,
	`“Feedback” means feedback, innovations, or suggestions sent by You regarding the attributes, performance, or features of our Service. `,
	`“Service” refers to the Website.`,
	`“Terms of Use” (also referred to as "Terms") mean these Terms of Use that form the entire agreement between You and Giftly regarding the use of the Service.`,
	`“Third-party Social Media Service” means any services or content (including data, information, products, or services) provided by a third party that may be displayed, included, or made available by the Service.`,
	`“Website” refers to [Giftly.me], accessible from [Giftly.me] `,
	`“You” means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.`,
];

const acknowledgment = [
	"These are the Terms of Use governing the use of this Service and the agreement that operates between You and Giftly. These Terms of Use set out the rights and obligations of all users regarding the use of the Service.",
	"Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms of Use. These Terms of Use apply to all visitors, users, and others who access or use the Service.",
	" By accessing or using the Service, You agree to be bound by these Terms of Use. If You disagree with any part of these Terms of Use, then You may not access the Service. ",
	"You represent that you are over the age of 18. Giftly does not permit those under 18 to use the Service. ",
	"Your access to and use of the Service is also conditioned on Your acceptance of and compliance with Giftly's Privacy Policy. Our Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.",
];

const access = [
    "Users: Those who may use our Website may include gift-givers, benefactors, and/or other users (collectively, the “Users”). Our Website is designed to allow users to perform various actions, including creating and posting wish lists, benefactors making claims on items, and linking out to third-party websites.",
    "Registration. To utilize Giftly, you may be required to complete a registration with us. You agree to enter and maintain true, accurate, and up-to-date information. You will not register with a pseudonym, false identity, avatar, or false image. Nor shall you submit or post any false or misleading information on our Website."
]

const Term = () => {
	return (
		<Wrapper>
			<Nav wt />
			<h1 className="title-2">Terms of Use</h1>
			<p>Our Terms of Use were last updated on the 28th of February, 2022. </p>
			<p>
				{" "}
				Please read these terms and conditions carefully before using Our
				Service.
			</p>
			<h3 className="title-3">Interpretation</h3>
			<p>
				The words in which the initial letter is capitalized have meanings
				defined under the following conditions. The following definitions shall
				have the same meaning regardless of whether they appear singular or
				plural
			</p>
			<h3 className="title-3">Definitions</h3>
			<ul>
				{details.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>

			<h3 className="title-3">Acknowledgment</h3>
			{acknowledgment.map((item) => (
				<p key={item}>{item}</p>
			))}

			<h3 className="title-3">Access And Use Of Site </h3>
			<ul>
				{access.map((item) => (
					<ol key={item}>{item}</ol>
				))}
			</ul>

			<Footer />
		</Wrapper>
	);
};

export default Term;
