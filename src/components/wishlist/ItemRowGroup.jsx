import { Formik } from "formik";
import styled from "styled-components";
import FormGroup from "components/global/FormGroup";
import removeIcon from "assets/icons/close_square.svg";
import CheckBox from "components/global/CheckBox";
import Spacer from "components/global/Spacer";
import linkIcon from "assets/icons/link.svg";

const RowWrapper = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: auto 48px;
  grid-gap: 16px;
  position: relative;
  margin-bottom: ${(props) => (props.header ? 0 : "16px")};
  background-color: var(--input-bg);
  border-radius: 8px;

  .remove {
    align-self: start;
    // justify-self: end;
    margin-top: 16px;
    width: max-content;
  }

  .submitBtn {
    display: none;
  }

  .mainInput {
    width: 100%;
  }

  .linkInput {
    padding: 8px 0;
    padding-bottom: 16px;
    padding-left: 48px;
    height: 36px;

    &.noCheck {
      padding-left: 24px;
    }

    input {
      display: block;
      color: var(--title-active);
      width: 100%;
      background-color: transparent;
      border: none;
      font-size: 16px;
      line-height: 24px;
      font-style: normal;
      font-weight: 400;

      &::placeholder {
        color: var(--placeholder);
      }
    }
  }
`;

const ItemRowGroup = ({
  initial,
  index,
  removeRow,
  rowValues,
  setFieldValue,
  noCheck,
}) => {
  // const [status, setStatus] = useState(false);
  return (
    <Formik
      initialValues={{
        name: "",
        link: "",
      }}
    >
      {({ handleSubmit }) => (
        <RowWrapper onSubmit={handleSubmit}>
          <div className="inputWrapper">
            <div className="flexRow alignCenter">
              {rowValues?.name && !noCheck && (
                <>
                  <Spacer x={2.4} />
                  <CheckBox
                    id={`status_${rowValues.id}`}
                    name={`status_${rowValues.id}`}
                    isChecked={
                      rowValues.status && rowValues.status !== "pending"
                    }
                    onChange={() => {
                      setFieldValue(
                        index,
                        "status",
                        `${
                          rowValues.status === "pending" ? "checked" : "pending"
                        }`
                      );
                    }}
                  />
                </>
              )}
              <FormGroup
                className="mainInput"
                fieldStyle="shortText"
                name="name"
                label="Gift name"
                value={rowValues?.name}
                onChange={(e) => {
                  setFieldValue(index, "name", e.target.value);
                }}
              />
            </div>
            {rowValues?.name && (
              <div
                className={`linkInput flexRow alignCenter${
                  noCheck ? " noCheck" : ""
                }`}
              >
                <img src={linkIcon} alt="link" className="icon" />
                <Spacer x={0.8} />
                <input
                  name="link"
                  placeholder="Purchase link"
                  value={rowValues?.link || ""}
                  onChange={(e) => setFieldValue(index, "link", e.target.value)}
                />
              </div>
            )}
          </div>

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
