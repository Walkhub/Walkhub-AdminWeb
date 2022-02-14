import React, { FC } from "react";
import styled from "@emotion/styled";

interface Props {
  width?: number;
  onClick: () => void;
}

const DefaultBtn: FC<Props> = ({ width, children, onClick }) => {
  return (
    <DefaultBtnBox width={width} onClick={onClick}>
      로그인
    </DefaultBtnBox>
  );
};

const DefaultBtnBox = styled.button<{ width?: number }>`
  cursor: pointer;
  width: ${Props => Props.width}px;
  height: 48px;
  background: ${props => props.theme.color.main};
  border-radius: 8px;
  color: ${props => props.theme.color.white};
  transition: all 0.3s;
  :hover {
    background: ${Props => Props.theme.color.white};
    border: 1px solid ${Props => Props.theme.color.main};
    color: ${Props => Props.theme.color.main};
  }
`;

export default DefaultBtn;
