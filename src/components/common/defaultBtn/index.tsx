import React, { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  width?: number;
  defaultColor?: boolean;
}

const DefaultBtn: FC<Props> = ({ defaultColor = true, ...props }) => {
  return (
    <DefaultBtnBox defaultColor={defaultColor} {...props}>
      {props.children}
    </DefaultBtnBox>
  );
};

const DefaultBtnBox = styled.button<{ width?: number; defaultColor: boolean }>`
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
