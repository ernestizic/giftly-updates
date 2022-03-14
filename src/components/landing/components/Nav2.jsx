import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Nav2Style = styled.div`
	
			@media (max-width: 760px) {
				display: none;
			}

			margin-right: 12rem;
			/* margin-top: 3.2rem; */
			a + a {
				margin-top: 2.4rem;
			}
			a {
				width: 10.8rem;
				display: block;
				font-size: 1.8rem;
				line-height: 2.8rem;
				color: var(--body);
			}
			a.active{
				
				color: var(--primary-main);
			}
`

const Nav2 = () => {

	let link = window.location.href;
	console.log(link.substring(link.length -6))
	
	
	return <Nav2Style className="links">
		<Link className={link.substring(link.length -6) === '/terms'  ? "active" : ""} to="/terms">Terms of use</Link>
		<Link className={link.substring(link.length -15) === '/privacy-policy'  ? "active" : ""} to="/privacy-policy">Privacy Policy</Link>
		<Link className={link.substring(link.length -5) === '/faqs' ? "active" : ""} to="/faqs">FAQs</Link>
	</Nav2Style>
}

;

export default Nav2
