import React, { useMemo, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "@emotion/styled";

interface optionListType {
  value: string | number;
  optionName: string | number;
}

interface PropsType {
  width: number;
  height: number;
  selectedValue: string | number;
  setSelectedValue: (value: string | number, name: string | number) => void;
  optionList: optionListType[];
  disabled: boolean;
  padding: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
  name: string;
  isBoard?: boolean;
}

const Dropdown: React.FC<PropsType> = ({
  width,
  height,
  selectedValue,
  setSelectedValue,
  optionList,
  disabled,
  padding,
  fontSize,
  lineHeight,
  fontWeight,
  isBoard = true,
  name,
}) => {
  const [isFold, setIsFold] = useState(false);

  const optionBoxStyleProps = {
    padding,
    fontSize,
    lineHeight,
    fontWeight,
    isBoard,
  };

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
            setSelectedValue(item.value, name);
            reverseDropdownStatus();
          }}
        >
          {item.optionName}
        </li>
      )),
    [optionList, setSelectedValue]
  );

  const SelectValue = useMemo(() => {
    const index = optionList.findIndex(
      (i: optionListType) => i.value === selectedValue
    );
    if (index === -1) return selectedValue;
    return optionList[index].optionName;
  }, [selectedValue]);

  return (
    <OutsideClickHandler onOutsideClick={() => setIsFold(false)}>
      <Wrapper
        width={width}
        height={height}
        isFold={isFold}
        {...optionBoxStyleProps}
        className='dropdown'
      >
        <Selected isDefaultValue={!disabled}>{SelectValue}</Selected>
        <button
          className='arrowButton'
          onClick={() => !disabled && reverseDropdownStatus()}
        >
          y
        </button>
      </Wrapper>
      {isFold && (
        <Options {...optionBoxStyleProps} width={width}>
          {OptionList}
        </Options>
      )}
    </OutsideClickHandler>
  );
};

const Wrapper = styled.label<{
  width: number;
  height: number;
  isFold: boolean;
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
  isBoard: boolean;
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  ${props =>
    props.isBoard &&
    `border: 1px solid ${
      props.isFold ? props.theme.color.main : props.theme.color.normal_gray
    }`};
  border-radius: 12px;
  display: flex;
  padding: 0 12px;
  font-size: ${props => props.fontSize}px;
  line-height: ${props => props.lineHeight}px;
  font-weight: ${props => props.fontWeight};
  font-style: normal;
  text-align: left;
  position: relative;
  align-items: center;
  cursor: pointer;
  > .arrowButton {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    margin-left: auto;
  }
`;
const Selected = styled.div<{
  isDefaultValue: boolean;
}>`
  width: calc(100% - 28px);
  height: 100%;
  display: flex;
  align-items: center;
  color: ${props =>
    props.isDefaultValue
      ? props.theme.color.black
      : props.theme.color.normal_gray};
`;

const Options = styled.ul<{
  width: number;
  padding: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
}>`
  width: ${({ width }) => width}px;
  position: absolute;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  background-color: ${({ theme }) => theme.color.white};
  margin-top: 12px;
  z-index: 99;
  > .eachOption {
    width: 100%;
    list-style: none;
    height: 48px;
    border-bottom: 1px solid ${({ theme }) => theme.color.normal_gray};
    padding: ${props => props.padding};
    font-size: ${props => props.fontSize}px;
    line-height: ${props => props.lineHeight}px;
    font-weight: ${props => props.fontWeight};
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.color.main};
    }
    :last-child {
      border-bottom: none;
    }
  }
`;

export default Dropdown;
