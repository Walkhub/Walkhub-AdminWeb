import React from 'react';
import styled from "@emotion/styled";

interface PropsType {
  disabled : boolean;
}

const InputHeader:React.FC<PropsType> = ({children,disabled}) => {
  return (
    <Wrapper disalbed={disabled}>
      <p className="text">{children}</p>
      <p className="required">*</p>
    </Wrapper>
  )
}
export default InputHeader

const Wrapper = styled.section<{
  disalbed : boolean;
}>`
  display: flex;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: normal;
  margin-bottom: 12px;
  > .text {
    color: ${props => props.disalbed ? props.theme.color.normal_gray : props.theme.color.black};
  }
  > .required {
    color: ${props => props.disalbed ? props.theme.color.normal_gray : "#4D99F0"};
  }
`