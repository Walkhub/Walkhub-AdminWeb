import React, { FC, InputHTMLAttributes } from "react";
import styled from "@emotion/styled";
import OutsideClickHandler from "react-outside-click-handler";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  setModalStatus: (status: boolean) => void;
}

const DeleteBtn = ({
  width,
  type = "button",
  setModalStatus,
  ...props
}: Props) => {
  return (
    <OutsideClickHandler onOutsideClick={() => setModalStatus(false)}>
      <Moresection>
        <Option type={type} width={width} {...props} />
      </Moresection>
    </OutsideClickHandler>
  );
};

export const Wrapper = styled.section`
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: black;
  position: relative;
  z-index: 99;
`;

const Moresection = styled.section`
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: black;
  position: relative;
  z-index: 99;
`;

export const Option = styled.input<{
  width?: number;
}>`
  width: ${({ width }) => (width ? `${width}px` : `100%`)};
  height: 36px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: red;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 3px 6px #21212129;
  padding: none;
  position: absolute;
  top: 20px;
  right: 0px;
  cursor: pointer;
  :after {
    content: "";
    width: 131.6px;
    border-bottom: 1px solid ${({ theme }) => theme.color.bright_gray};
    position: absolute;
    margin-top: 31px;
  }
  :last-child {
    :after {
      width: 0;
      height: 0;
    }
  }
`;

export default DeleteBtn;
