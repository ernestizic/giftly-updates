import React from "react";
import styled from "styled-components";
import FormGroup from "./FormGroup";
import Logo from "./Logo";
import { Formik } from "formik";
import FormWrapper from "./FormWrapper";
import search from "../../assets/icons/search.svg";
import Button from "./Button";

const Wrapper = styled.nav`
	height: 9.6rem;
	padding: 0 12rem;
	background-color: var(--title-active);
	display: flex;
	align-items: center;
	@media (max-width: 760px) {
		padding: 0 2rem;
	}
	form {
		width: 32rem;
		position: relative;
		height: 4.8rem;
		margin-left: 4.8rem;
		margin-right: auto;
		display: block;
		@media (max-width: 760px) {
			/* width: auto */
			.input {
				display: none;
			}

			.mb{
				display:block;
			}
		
		}

		& > div > div {
			padding-left: 3.667rem;
			@media (max-width: 760px) {
				padding: 0;
			}
		}
	}
	.search {
		position: absolute;
		z-index: 6;
		left: 2.4rem;
		top: 1.6rem;
		@media (max-width: 760px) {
			position: sticky;
			top: 4.1rem;
			left: 23%;
		}
	}
	& > button:last-child {
		margin-left: 2.4rem;
	}
`;

const Nav = () => {
	const [showInput, setShowInput] = React.useState(false);

	const handleRegister = async (cred) => {
		// navigate("/home/verify-email");
		return;
	};
	return (
		<Wrapper>
			<Logo />
			<Formik
				initialValues={{
					search: "",
				}}
				onSubmit={(values) => {
					handleRegister(values);
				}}
			>
				{({ handleSubmit, isSubmitting, isValid, values }) => (
					<FormWrapper onSubmit={handleSubmit}>
						<img
							onClick={() => setShowInput(!showInput)}
							src={search}
							alt="search"
							className="search"
						/>
						<FormGroup
							fieldStyle="shortText"
							label="Find friends"
							name="search"
							className={`input ${showInput ? "mb" : ""}`}
						/>
					</FormWrapper>
				)}
			</Formik>
			<Button bg="white" color="var(--primary-main)" text="Login" />
			<Button text="Sign up" />
		</Wrapper>
	);
};

export default Nav;
