import React, { FC, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import styled from "@emotion/styled";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  defaultColor?: boolean;
}

const DefaultBtn = ({
  defaultColor = true,
  type = "button",
  ...props
}: Props) => {
  return <DefaultBtnBox type={type} defaultColor={defaultColor} {...props} />;
};

const DefaultBtnBox = styled.input<{ width?: number; defaultColor: boolean }>`
  cursor: pointer;
  width: ${({ width }) => (width ? `${width}px` : `100%`)};
  height: 48px;
  background: ${({ defaultColor, theme }) =>
    defaultColor ? theme.color.main : theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.main};
  border-radius: 8px;
  color: ${({ defaultColor, theme }) =>
    defaultColor ? theme.color.white : theme.color.main};
  transition: all 0.3s;
  :hover {
    background: ${({ defaultColor, theme }) =>
      defaultColor ? theme.color.white : theme.color.main};
    border: 1px solid ${({ theme }) => theme.color.main};
    color: ${({ defaultColor, theme }) =>
      defaultColor ? theme.color.main : theme.color.white};
  }
`;

export default DefaultBtn;
