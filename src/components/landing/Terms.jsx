import Footer from "components/global/Footer";
import Nav from "components/global/Nav";
import React from "react";
import styled from "styled-components";
import Nav2 from "./components/Nav2";

const Wrapper = styled.div`
	.ctn {
		padding: 9.6rem 0 10.1rem 12rem;
		display: flex;
		&>:first-child{
			width: 95.5rem;

		}
		
		@media (max-width: 760px){
			width: auto;
			padding: 4.8rem 2.4rem;
		}
	}
`;

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
	"Registration. To utilize Giftly, you may be required to complete a registration with us. You agree to enter and maintain true, accurate, and up-to-date information. You will not register with a pseudonym, false identity, avatar, or false image. Nor shall you submit or post any false or misleading information on our Website.",
	"Account Security. To conduct certain activities and functionalities of the Website, you may need to register for an account, including creating access credentials, such as an email address and password. You are solely responsible for (1) monitoring, controlling access to, and maintaining the strict confidentiality of your access credentials, (2) not allowing another person to use your access credentials, and (3) any charges or damages that may be incurred as a result of your failure to maintain the strict confidentiality of your access credentials. We are not responsible for any harm relating to the theft of access credentials resulting from your actions, your disclosure of access credentials, or your decision in violation of these Terms to allow another person or entity to access and use our Website using your access credentials. You must immediately notify us regarding any unauthorized use of your account or access credentials, or any other concerns that you have about the misuse or security of your account, by contacting us at the mailing or email address listed below. You acknowledge and agree that you are solely responsible for maintaining the safety of the devices you may use to access the Website. We are not liable for any losses resulting from the loss or theft of any such device.",
	"Availability. The website is not intended for distribution to, or use by, any person or entity in any city, county, state, or country where its distribution or use would be contrary to its respective law or regulation. By offering our Services, no distribution or solicitation is made by us to any person to use our Services in jurisdictions where the provision of our Site is prohibited by law. We are also not responsible for system outages, slowdowns, or capacity limitations",
	" Monitoring Our Website. We have no obligation to monitor our Website; however, you acknowledge and agree that we have the right to monitor our Website from time to time and disclose any information as necessary or appropriate to satisfy any law, regulation, governmental request to operate or improve our Website, or to protect ourselves or Users of our Website.",
	"Information Publicly Available. Some information you provide us, such as profile information or information about wish lists, may be publicly available on our Website. Please review our Privacy Policy before using our Website.",
];

const contentRight = [
	"Our Service allows You to post Content. You are responsible for the Content that You post to the Service, including its legality, reliability, and appropriateness.",
	"By posting Content to the Service, You grant Giftly the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain all of Your rights to any Content You submit, post, or display on or through the Service, and You are responsible for protecting those rights. You agree that this license includes the right for Giflty to make Your Content available to other users of the Service, who may also use Your Content subject to these Terms.",
	"You represent and warrant that: (i) the Content is Yours (You own it) or You have the right to use it and grant Us the rights and license as provided in these Terms, and (ii) the posting of Your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.",
];

const contentRestriction = [
	"The Company is not responsible for the content of the Service's users. You expressly understand and agree that You are solely responsible for the Content and for all activity that occurs under your account, whether done so by You or any third person using Your account. ",
	"You may not transmit any unlawful Content, offensive, upsetting, intended to disgust, threaten, libellous, defamatory, obscene, or otherwise objectionable. Examples of such objectionable Content include, but are not limited to, the following:",
	"Unlawful or promoting unlawful activity. Defamatory, discriminatory, or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, national/ethnic origin, or other targeted groups. Spam, machine – or randomly-generated, constituting unauthorized or unsolicited advertising, chain letters, any other form of unauthorized solicitation, or any form of lottery or gambling. To Install any viruses, worms, malware, trojan horses, or other content designed or intended to disrupt, damage, or limit the functioning of any software, hardware, or telecommunications equipment or to damage or obtain unauthorized access to any data or other information of a third person. Infringing on the proprietary rights of any party, including patent, trademark, trade secret, copyright, right of publicity, or other rights. Impersonating any person or entity, including the Company and its employees or representatives. Violating the privacy of any third person. False information and features. ",
	" The Company reserves the right, but not the obligation, to, in its sole discretion, determine whether or not any Content is appropriate and complies with this Terms, refuse or remove this Content. The Company further reserves the right to make formatting and edits and change the manner of any Content. The Company can also limit or revoke the use of the Service if You post such objectionable Content.",
	" As Giftly cannot control all Content posted by users and/or third parties on the Service, you agree to use the Service at your own risk. You understand that by using the Service, You may be exposed to content that You may find offensive, indecent, incorrect, or objectionable, and You agree that under no circumstances will the Company be liable in any way for any content, including any errors or omissions in any content, or any loss or damage of any kind incurred as a result of your use of any content. ",
];
const contentBackups = [
	"Although regular backups of Content are performed, Giftly guarantees no loss or corruption of data. ",
	"Corrupt or invalid backup points may be caused by corrupted content prior to being backed up or changes when a backup is performed.",
	"The Company will provide support and attempt to troubleshoot any known or discovered issues that may affect the backups of Content. But You acknowledge that the Company has no liability related to the integrity of Content or the failure to restore Content to a usable state successfully.",
	"You agree to maintain a complete and accurate copy of any Content in a location independent of the Service.",
];

const intellectualProperty = [
	"The Service and its original content (excluding Content provided by You or other users), features, and functionality are and will remain Giftly's exclusive property and that of its licensors.",
	"The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.",
	"Our trademarks and trade dress may not be used in connection with any product or service without Giftly's prior written consent.",
];

const feedback = [
	"You assign all rights, title, and interest in any Feedback You provide the Company. Suppose for any reason such assignment is ineffective; in that case, You agree to grant the Company a non-exclusive, perpetual, irrevocable, royalty-free, worldwide right and license to use, reproduce, disclose, sub-license, distribute, modify and exploit such Feedback without restriction.",
	"No Endorsement",
	"We do not endorse and are not responsible for any User, wish list, benefactor, or individual using our Website. Any wish lists you claim are at your own risk. It is your responsibility to determine whether you feel your wish list claim is a sound decision.",
	"No Guarantees ",
	" We do not guarantee that any wish list will get the claimed items from benefactors. We disclaim any liability or responsibility for the success or outcome of a wish list. Furthermore, we don’t and cannot verify the information a User provides on their wish list.",
	"Content Backups ",
	" Although regular backups of Content are performed, Giftly guarantees no loss or corruption of data. Corrupt or invalid backup points may be caused by corrupted content prior to being backed up or changes when a backup is performed. The Company will provide support and attempt to troubleshoot any known or discovered issues that may affect the backups of Content. But You acknowledge that the Company has no liability related to the integrity of Content or the failure to restore Content to a usable state successfully. You agree to maintain a complete and accurate copy of any Content in a location independent of the Service.",
];

const linkToWebsite = [
	"Our Service may contain links to third-party websites or services not owned or controlled by the Company.",
	"Giftly has no control over and assumes no responsibility for any third-party websites or services' content, privacy policies, or practices. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such web sites or services.",
	"We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.",
];

const termination = [
	"Giftly may terminate or suspend Your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms of Use.",
	"Upon termination, Your right to use the Service will cease immediately. If You wish to terminate Your Account, You may simply discontinue using the Service.",
	"Limitation of Liability",
	"To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data, or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.",
	`AS IS" and "AS AVAILABLE`,
	`The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind.`,
	"To the maximum extent permitted under applicable law, the Company, on its behalf and behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory, or otherwise, concerning the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of a course of dealing, course of performance, usage or trade practice.",
	"Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error-free or that any errors or defects can or will be corrected. ",
	" Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error-free or that any errors or defects can or will be corrected. Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.",
];

const governingLaw = [
	"The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.",
];

const disputeResolution = [
	"If You have any concern or dispute about the Service, You agree first to try resolving the dispute informally by contacting the Company. "
]

const severability = [
	"Severability",
	"Suppose any provision of these Terms is held to be unenforceable or invalid; in that case, such provision will be changed and interpreted to accomplish the objectives of the provision to the greatest extent possible under applicable law. The remaining provisions will continue in full force and effect.",
	"Waiver",
	"Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time after that, nor shall the waiver of a breach constitute a waiver of any subsequent breach."
]

const changesTerms = [
	"We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is a material, we will make reasonable efforts to provide at least 30 days' notice before any new terms take effect. What constitutes a material change will be determined at Our sole discretion. ",
	"By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service. "
]

const contactUs = [
	"If you have any questions about these Terms of Use, You can contact us: ",
	"By visiting this page on our website: giftly.me ",
	"By sending us an email: info@giftly.me "
]

const Term = () => {
	return (
		<Wrapper>
			<Nav wt />
			<div className="ctn">
				<div>
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
					<h3 className="title-3">Content </h3>
					<h4>Your Right to Post Content</h4>
					{contentRight.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h4>Content Restrictions</h4>
					{contentRestriction.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h4> Content Backups</h4>
					{contentBackups.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3 className="title-3">Intellectual Property </h3>
					{intellectualProperty.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3>Your Feedback to Us</h3>
					{feedback.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3>Links to Other Websites</h3>
					{linkToWebsite.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3>Termination</h3>
					{termination.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3>Governing Law</h3>
					{governingLaw.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3>Disputes Resolution</h3>
					{disputeResolution.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3>Severability and Waiver </h3>
					{severability.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3> Changes to These Terms of Use </h3>
					{changesTerms.map((item) => (
						<p key={item}>{item}</p>
					))}
					<h3> Contact Us</h3>
					{contactUs.map((item) => (
						<p key={item}>{item}</p>
					))}
				</div>
				<Nav2/>
			</div>

			<Footer />
		</Wrapper>
	);
};

export default Term;
