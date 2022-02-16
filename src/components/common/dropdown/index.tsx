import React, { useMemo, useState } from "react";
import * as S from './styles';
import OutsideClickHandler from "react-outside-click-handler";

interface PropsType {
  width : number;
  heigth : number;
  selectedValue : string;
  setSelectedValue : (value : string) => void;
  optionList : string[];
}
const Dropdown:React.FC<PropsType> = ({width,heigth,selectedValue,setSelectedValue,optionList}) => {
  const [isFold,setIsFold] = useState(false);
  const reverseDropdownStatus = () => {
    setIsFold((prev)=>!prev)
  }
  const OptionList = useMemo(
    () =>
      optionList.map((item)=>(
        <li className="eachOption" onClick={() => {
          setSelectedValue(item);
          reverseDropdownStatus()
        }}>{item}</li>
      )),[optionList]
  )
  return (
    <OutsideClickHandler onOutsideClick={() => setIsFold(false)}>
      <S.Wrapper width={width} heigth={heigth} isFold={isFold} className="dropdown">
        <S.Selected  isDefaultValue={optionList.includes(selectedValue)}>{selectedValue}</S.Selected>
        <button className="arrowButton" onClick={reverseDropdownStatus}>y</button>
      </S.Wrapper>
      {
        isFold &&
        <S.Options width={width}>
          {OptionList}
        </S.Options>
      }
    </OutsideClickHandler>
  )
}
export default Dropdown;