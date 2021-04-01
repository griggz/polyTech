import styled from "@emotion/styled";

const AmountButton = styled.button`
  display: block;
  height: 40px;
  width: 100%;
  font-size: inherit;
  background-color: ${(props) => (props.disabled ? "#ff7f51" : "#008dc9")};
  box-shadow: ${(props) =>
    props.disabled
      ? "0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #ff7f51;"
      : "none"};
  border-radius: 1px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  border-radius: 3;
  border: 0;
  color: "white";
  transition: "all .3s ease-in-out";
`;

export default AmountButton;
