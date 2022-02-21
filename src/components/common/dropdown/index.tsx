import React, { useMemo, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "@emotion/styled";

interface PropsType {
  width: number;
  heigth: number;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  optionList: string[];
  disabled: boolean;
}
const Dropdown: React.FC<PropsType> = ({
  width,
  heigth,
  selectedValue,
  setSelectedValue,
  optionList,
  disabled,
}) => {
  const [isFold, setIsFold] = useState(false);
  const reverseDropdownStatus = () => {
    setIsFold(prev => !prev);
  };
  const OptionList = useMemo(
    () =>
      optionList.map((item, index) => (
        <li
          key={index}
          className='eachOption'
          onClick={() => {
            setSelectedValue(item);
            reverseDropdownStatus();
          }}
        >
          {item}
        </li>
      )),
    [optionList]
  );
  return (
    <OutsideClickHandler onOutsideClick={() => setIsFold(false)}>
      <Wrapper
        width={width}
        heigth={heigth}
        isFold={isFold}
        className='dropdown'
      >
        <Selected isDefaultValue={optionList.includes(selectedValue)}>
          {selectedValue}
        </Selected>
        <button
          className='arrowButton'
          onClick={() => !disabled && reverseDropdownStatus()}
        >
          y
        </button>
      </Wrapper>
      {isFold && <Options width={width}>{OptionList}</Options>}
    </OutsideClickHandler>
  );
};

const Wrapper = styled.label<{
  width: number;
  heigth: number;
  isFold: boolean;
}>`
  width: ${({ width }) => width}px;
  height: ${({ heigth }) => heigth}px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  border: 1px solid
    ${props =>
      props.isFold ? props.theme.color.main : props.theme.color.normal_gray};
  border-radius: 12px;
  display: flex;
  padding: 12px 0 12px 16px;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: normal;
  text-align: left;
  position: relative;
  cursor: pointer;

  > .arrowButton {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }
`;
const Selected = styled.div<{
  isDefaultValue: boolean;
}>`
  width: calc(100% - 28px);
  height: 100%;
  color: ${props =>
    props.isDefaultValue
      ? props.theme.color.black
      : props.theme.color.normal_gray};
`;

const Options = styled.ul<{
  width: string;
}>`
  width: ${({ width }) => width}px;
  position: absolute;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  background-color: ${({ theme }) => theme.color.white};
  margin-top: 12px;
  > .eachOption {
    width: 100%;
    list-style: none;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.color.normal_gray};
    :hover {
      color: ${({ theme }) => theme.color.main};
    }
    :last-child {
      border-bottom: none;
    }
  }
`;

export default Dropdown;