import styled from "styled-components";
import { useState } from "react";

type TextFieldProps = {
  type: "text" | "password";
  placeholder?: string;
  label?: string;
  onChange?: () => void;
	name?: string;
};

const StyledTextField = styled.input`
  background-color: #f8f4f4;
  border: 1px solid #f8f4f4;
  border-radius: 4px;
  height: 40px;
  padding-left: 0.7em;
  font-size: 1em;
  margin-bottom: 0.5em;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 250px;
`;

const StyledLabel = styled.label`
  color: ${(props) => props.theme.fadedTeal};
  font-size: 0.9em;
  padding-bottom: 0;
`;

const TextField = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FlexBox>
      {props.label && <StyledLabel>{props.label}</StyledLabel>}
      <StyledTextField
				name={props.name}
        onChange={props.onChange}
        type={props.type === "password" && showPassword ? "text" : props.type}
        placeholder={props.placeholder}
      />
      {props.type === "password" && (
        <div>
          <input
            type="checkbox"
            onClick={() => setShowPassword(!showPassword)}
          />{" "}
          <label>Show Password</label>{" "}
        </div>
      )}
    </FlexBox>
  );
};

export default TextField;