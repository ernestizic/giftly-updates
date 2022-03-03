import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import FormGroup from "components/global/FormGroup";
import removeIcon from "assets/icons/close_square.svg";

const RowWrapper = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 4fr 24px;
  grid-gap: 16px;
  position: relative;
  margin-bottom: ${(props) => (props.header ? 0 : "16px")};

  .remove {
    justify-self: end;
  }

  .submitBtn {
    display: none;
  }
`;

const ItemRowGroup = ({
  initial,
  index,
  removeRow,
  rowValues,
  setFieldValue,
}) => {
  return (
    <Formik
      initialValues={{
        gift_name: "",
        product_link: "",
      }}
    >
      {({ handleSubmit }) => (
        <RowWrapper onSubmit={handleSubmit}>
          <FormGroup
            fieldStyle="shortText"
            name="gift_name"
            label="Gift name"
            value={rowValues?.first_name}
            onChange={setFieldValue}
            rowIndex={index}
          />
          <FormGroup
            fieldStyle="shortText"
            name="product_link"
            label="Product link"
            value={rowValues?.last_name}
            onChange={setFieldValue}
            rowIndex={index}
          />
          {!initial && index !== 0 && (
            <button
              type="button"
              className="remove"
              onClick={() => removeRow(index)}
            >
              <img src={removeIcon} alt="remove" className="icon" />
            </button>
          )}
          <button className="submitBtn" type="submit"></button>
        </RowWrapper>
      )}
    </Formik>
  );
};

export default ItemRowGroup;
