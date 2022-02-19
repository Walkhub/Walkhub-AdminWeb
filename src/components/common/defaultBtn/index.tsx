import React, { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  width?: number;
}

const DefaultBtn: FC<Props> = props => {
  return <DefaultBtnBox {...props}>{props.children}</DefaultBtnBox>;
};

const DefaultBtnBox = styled.button<{ width?: number }>`
  cursor: pointer;
  width: ${({ width }) => (width ? `${width}px` : `100%`)};
  height: 48px;
  background: ${({ theme }) => theme.color.main};
  border-radius: 8px;
  color: ${({ theme }) => theme.color.white};
  transition: all 0.3s;
  :hover {
    background: ${({ theme }) => theme.color.white};
    border: 1px solid ${({ theme }) => theme.color.main};
    color: ${({ theme }) => theme.color.main};
  }
`;

export default DefaultBtn;
