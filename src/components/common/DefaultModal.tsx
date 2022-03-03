import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC } from "react";

interface Props {
  width?: string;
  height?: string;
}

const DefaultModal: FC<Props> = ({ width, height, children }) => {
  return (
    <>
      <DefaultModalBackground>
        <DefaultModalWrapper width={width || ""} height={height || ""}>
          <CloseBtn>&times;</CloseBtn>
          <div>{children}</div>
        </DefaultModalWrapper>
      </DefaultModalBackground>
    </>
  );
};

export default DefaultModal;

const DefaultModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(117, 117, 117, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const fadeIn = keyframes`
  from {
    transform: scale(.7);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
;
`;
const DefaultModalWrapper = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 12px;
  animation: ${fadeIn} 0.2s linear;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; ;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 32px;
  right: 48px;
  cursor: pointer;
  font-size: 32px;
`;
