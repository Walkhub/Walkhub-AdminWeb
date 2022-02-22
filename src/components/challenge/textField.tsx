import React, { ChangeEvent } from "react";
import InputHeader from "@src/components/challenge/inputHeader";
import styled from "@emotion/styled";

interface PropsType {
  width : number;
  disabled : boolean;
  placeholder : string;
  inputValue : string | number | null;
  changeInputValue : (e:ChangeEvent<HTMLInputElement>) => void;
  summary? : string;
  inputName : string;
  type : "text" | "number"
}

const TextField:React.FC<PropsType> = ({width,disabled,placeholder,inputValue,changeInputValue,summary,inputName,type}) => {
  const getClassName = `textFieldWrapper ${inputName}`
  return (
    <section className={getClassName}>
      {summary && <InputHeader disabled={false}>{summary}</InputHeader>}
      <Input name={inputName} width={width} type={type} value={inputValue || ""} onChange={changeInputValue} placeholder={placeholder}/>
    </section>
  )
}
export default TextField

const Input = styled.input<{
  width : number;
}>`
  width: ${props => props.width}px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  padding: 12px 16px;
  font-size:16px;
  line-height:24px;
  font-style: normal;
  font-weight: normal;
  color:${({theme})=>theme.color.black};
  ::placeholder {
    color: ${({theme})=>theme.color.normal_gray};
  }
  ::-webkit-inner-spin-button,::-webkit-outer-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
`