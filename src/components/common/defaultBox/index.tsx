import styled from "@emotion/styled";
import React, { FC, HTMLAttributes } from "react";

interface Props {
  width: number;
  height: number;
}

const DefaultBox: FC<Props> = props => {
  return (
    <>
      <DefaultBoxStyle {...props}>{props.children}</DefaultBoxStyle>
    </>
  );
};

export default DefaultBox;

const DefaultBoxStyle = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px;
  cursor: pointer;
`;
