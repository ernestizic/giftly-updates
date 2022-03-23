import React from "react";
import styled from "styled-components";
// import FormGroup from "./FormGroup";
import Logo from "./Logo";
// import { Formik } from "formik";
// import FormWrapper from "./FormWrapper";
// import search from "../../assets/icons/search.svg";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Spacer from "./Spacer";

const Wrapper = styled.nav`
	height: 9.6rem;
	padding: 0 12rem;
	max-width: 1440px;
	margin: auto;
	background-color: ${(props) =>
		props.wt ? "white" : " var(--title-active);"};
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 768px) {
		padding: 0 2rem;
	}

	form {
		width: 32rem;
		position: relative;
		height: 4.8rem;
		margin-left: 4.8rem;
		margin-right: auto;
		display: block;
		@media (max-width: 768px) {
			/* width: auto */
			.input {
				display: none;
			}

			.mb {
				display: block;
			}
		}

		& > div > div {
			padding-left: 3.667rem;
			@media (max-width: 768px) {
				padding: 0;
			}
		}
	}
	.search {
		position: absolute;
		z-index: 6;
		left: 2.4rem;
		top: 1.6rem;
		@media (max-width: 768px) {
			position: sticky;
			top: 4.1rem;
			left: 23%;
			filter: var(--filter-white);
		}
	}
	& > button:last-child {
		margin-left: 2.4rem;
	}
`;

const Nav = ({ wt }) => {
	const navigate = useNavigate();
	// const [showInput, setShowInput] = React.useState(false);

	return (
		<Wrapper wt={wt}>
			<div className="flexRow alignCenter">
				<Logo onClick={() => navigate("/home")} />
			</div>
			<div className="flexRow alignCenter">
				<Button
					bg="var(--accent_2-main)"
					color="var(--primary-main)"
					text="Login"
					onClick={() => navigate("/home/login")}
				/>
				<Spacer x={2.4} xMobile={1.6} />
				<Button text="Sign up" onClick={() => navigate("/home/sign-up")} />
			</div>
		</Wrapper>
	);
};

export default Nav;
