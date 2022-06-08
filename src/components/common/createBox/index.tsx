import styled from "@emotion/styled";
import React, { FC, useState } from "react";
import Image from "next/image";
import Plus from "../../../assets/plus.svg";
import Plus_White from "../../../assets/plus_white.svg";

interface Props {
  width: number;
  height: number;
}

const CreateBox: FC<Props> = props => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <>
      <DefaultBoxStyle {...props}>
        <PlusBtn
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          {props.children}
          <Image
            src={isHover ? Plus_White : Plus}
            alt='plus'
            width={50}
            height={50}
          />
        </PlusBtn>
      </DefaultBoxStyle>
    </>
  );
};

export default CreateBox;

const DefaultBoxStyle = styled.div<{
  width: number;
  height: number;
}>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const PlusBtn = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
