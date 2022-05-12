import React, { InputHTMLAttributes } from "react";
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

const DefaultBtnBox = styled.input<{
  width?: number;
  defaultColor: boolean;
}>`
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
    :disabled {
      color: ${({ theme }) => theme.color.bright_gray};
    }
  }
  :disabled {
    border-color: rgba(87, 180, 241, 0.5);
    background-color: rgba(87, 180, 241, 0.5);
    color: ${({ theme }) => theme.color.bright_gray};
  }
`;

export default DefaultBtn;
