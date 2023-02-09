import styled from "styled-components";

const FormWrapper = styled.form`
  width: stretch;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-gap: 2.4rem; */
  grid-gap: 16px;

  .spanFull {
    grid-column: 1/3;
  }
`;

export default FormWrapper;
