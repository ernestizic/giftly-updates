import Footer from "components/global/Footer";
import Nav from "components/global/Nav";
import React from "react";
import styled from "styled-components";
import Nav2 from "./components/Nav2";
import data from "assets/data.json";

const Wrapper = styled.div`
	.ctn {
		padding: 9.6rem 0 10.1rem 12rem;
		display: flex;
		@media (max-width: 1000px) {
			padding: 9.6rem 0 10.1rem 5rem;
		}
		& > :first-child {
			width: 95.5rem;
			@media (max-width: 900px) {
				width: auto;
				max-width: 89rem;
			}

			h1,
			h3,
			h4 {
				color: var(--title-active);
				margin-bottom: 1.6rem;
				font-family: var(--font_2);
			}

			h1 {
				font-size: 4.8rem;
				line-height: 5.6rem;
				@media (max-width: 1000px) {
					font-size: 3.6rem;
					line-height: 4.8rem;
				}
			}

			h3 {
				margin-top: 3.2rem;
				font-size: 3.6rem;
				line-height: 4.8rem;
				@media (max-width: 1000px) {
					font-size: 2.4rem;
					line-height: 3.6rem;
				}
			}

			h4 {
				margin-top: 3.2rem;
				font-size: 2.4rem;
				line-height: 3.6rem;
				margin: 1.6rem 0;
				@media (max-width: 1000px) {
					font-size: 1.8rem;
					line-height: 2.4rem;
				}
			}

			p,
			li {
				font-size: 2rem;
				line-height: 2.8rem;
				@media (max-width: 1000px) {
					font-size: 1.6rem;
					line-height: 2.4rem;
				}
			}
			li {
				margin-left: 1.673rem;
			}
		}
		& > :last-child {
			margin-left: auto;
		}
		.mag-tp {
			margin-top: 3.2rem;
		}
		@media (max-width: 768px) {
			width: auto;
			padding: 4.8rem 2.4rem;
		}
	}
`;

const Term = () => {
	return (
		<Wrapper>
			<Nav wt />
			<div className="ctn">
				<div>
					<h1 className="title-2">Terms of Use</h1>
					<p>
						Our Terms of Use were last updated on the 28th of February, 2022.{" "}
					</p>
					<p className="mag-tp">
						Please read these terms and conditions carefully before using Our
						Service.
					</p>
					<h3 className="title-3">Interpretation</h3>
					<p>
						The words in which the initial letter is capitalized have meanings
						defined under the following conditions. The following definitions
						shall have the same meaning regardless of whether they appear
						singular or plural
					</p>
					<h3 className="title-3">Definitions</h3>
					<ul>
						{data.terms.details.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
					<h3 className="title-3">Acknowledgment</h3>
					{data.terms.acknowledgment.map((item, index) => (
						<p className={index !== 0 ? "mag-tp" : ""} key={item}>
							{item}
						</p>
					))}
					<h3 className="title-3">Access And Use Of Site </h3>
					<ol>
						{data.terms.access.map((item, index) => (
							<li key={item}>{item}</li>
						))}
					</ol>
					<h3 className="title-3">Content </h3>
					<h4>Your Right to Post Content</h4>
					{data.terms.contentRight.map((item, index) => (
						<p className={index !== 0 ? "mag-tp" : ""} key={item}>
							{item}
						</p>
					))}
					<h4>Content Restrictions</h4>
					{data.terms.contentRestriction.map((item, index) => (
						<p className={index !== 0 ? "mag-tp" : ""} key={item}>
							{item}
						</p>
					))}
					<h4> Content Backups</h4>
					{data.terms.contentBackups.map((item, index) => (
						<p className={index !== 0 ? "mag-tp" : ""} key={item}>
							{item}
						</p>
					))}
					<h3 className="title-3">Intellectual Property </h3>
					{data.terms.intellectualProperty.map((item, index) => (
						<p className={index !== 0 ? "mag-tp" : ""} key={item}>
							{item}
						</p>
					))}
					<h3 className="title-3">Your Feedback to Us</h3>
					{data.terms.feedback.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3 className="title-3">Links to Other Websites</h3>
					{data.terms.linkToWebsite.map((item, index) => (
						<p className={index !== 0 ? "mag-tp" : ""} key={item}>
							{item}
						</p>
					))}
					<h3 className="title-3">Termination</h3>
					{data.terms.termination.map((item, index) =>
						index !== 2 && index !== 4 ? (
							<p className={index !== 0 ? "mag-tp" : ""} key={item}>
								{item}
							</p>
						) : (
							<h3 key={item} className="title-3">
								{item}
							</h3>
						)
					)}

					<h3 className="title-3">Governing Law</h3>
					{data.terms.governingLaw.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3 className="title-3">Disputes Resolution</h3>
					{data.terms.disputeResolution.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3 className="title-3">Severability and Waiver </h3>
					{data.terms.severability.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3 className="title-3"> Changes to These Terms of Use </h3>
					{data.terms.changesTerms.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3 className="title-3"> Contact Us</h3>
					<ul>
						{data.terms.contactUs.map((item, index) =>
							index === 0 ? (
								<p key={item}>{item}</p>
							) : (
								<li key={item}>{item}</li>
							)
						)}
					</ul>
				</div>
				<Nav2 />
			</div>

			<Footer />
		</Wrapper>
	);
};

export default Term;
