import React, { useMemo, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "@emotion/styled";

interface optionListType {
  value: string;
  optionName: string;
}

interface PropsType {
  width: number;
  heigth: number;
  selectedValue: string;
  setSelectedValue: (value: string, name: string) => void;
  optionList: optionListType[];
  disabled: boolean;
  padding: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
  name: string;
}
const Dropdown: React.FC<PropsType> = ({
  width,
  heigth,
  selectedValue,
  setSelectedValue,
  optionList,
  disabled,
  padding,
  fontSize,
  lineHeight,
  fontWeight,
  name,
}) => {
  const [isFold, setIsFold] = useState(false);

  const optionBoxStyleProps = {
    padding,
    fontSize,
    lineHeight,
    fontWeight,
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
        heigth={heigth}
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
  heigth: number;
  isFold: boolean;
  padding: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
}>`
  width: ${({ width }) => width}px;
  height: ${({ heigth }) => heigth}px;
  border: 1px solid
    ${props =>
      props.isFold ? props.theme.color.main : props.theme.color.normal_gray};
  border-radius: 12px;
  display: flex;
  padding: ${props => props.padding};
  font-size: ${props => props.fontSize}px;
  line-height: ${props => props.lineHeight}px;
  font-weight: ${props => props.fontWeight};
  font-style: normal;
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
    :hover {
      color: ${({ theme }) => theme.color.main};
    }
    :last-child {
      border-bottom: none;
    }
  }
`;

export default Dropdown;
