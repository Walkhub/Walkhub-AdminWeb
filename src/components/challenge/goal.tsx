import React, { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import Dropdown from "@src/components/common/dropdown";
import TextField from "@src/components/challenge/textField";
import InputHeader from "@src/components/challenge/inputHeader";
import { ChallengeContentType } from "@src/utils/interfaces/challenge";

type goalScopeType = "DAY" | "ALL" | "기간";
interface goalScopeOptionType {
  optionName: "하루 1번" | "최초 1번";
  value: goalScopeType;
}
const goalScopeOption: goalScopeOptionType[] = [
  {
    optionName: "하루 1번",
    value: "DAY",
  },
  {
    optionName: "최초 1번",
    value: "ALL",
  },
];
type goalType = "WALK" | "DISTANCE" | "조건";
interface gaolOptionType {
  optionName: "걸음 수" | "거리";
  value: goalType;
}
const goalTypeOption: gaolOptionType[] = [
  {
    optionName: "걸음 수",
    value: "WALK",
  },
  {
    optionName: "거리",
    value: "DISTANCE",
  },
];

interface goalStateType {
  goal_scope: goalScopeType;
  goal_type: goalType;
  goal: number | null;
  time: number | null;
}

interface PropsType {
  onChangeDropdownValue : (value:string,name:string) => void;
  onChangeInputValue : (e:ChangeEvent<HTMLInputElement>) => void;
  state : ChallengeContentType;
}

const Goal: React.FC<PropsType> = ({onChangeDropdownValue,onChangeInputValue,state}) => {
  const [time,setTime] = useState<number | null>(null)
  const onChangeTime = (e:ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    setTime(time)
  }
  return (
    <Wrapper>
      <InputHeader disabled={false}>챌린지 목표</InputHeader>
      <InputArea>
        <Dropdown
          width={132}
          heigth={48}
          selectedValue={state.goal_scope || "기간"}
          setSelectedValue={onChangeDropdownValue}
          optionList={goalScopeOption}
          disabled={false}
          padding='12px 16px'
          fontSize={16}
          lineHeight={24}
          fontWeight={"normal"}
          name='goal_scope'
        />
        <Dropdown
          width={132}
          heigth={48}
          selectedValue={state.goal_type || "조건"}
          setSelectedValue={onChangeDropdownValue}
          optionList={goalTypeOption}
          disabled={false}
          padding='12px 16px'
          fontSize={16}
          lineHeight={24}
          fontWeight={"normal"}
          name='goal_type'
        />
        <TextField
          width={340}
          disabled={false}
          placeholder='목표값'
          inputValue={state.goal}
          changeInputValue={onChangeInputValue}
          inputName='goal'
          type='number'
        />
        <TextField
          width={132}
          disabled={false}
          placeholder='횟수'
          inputValue={time}
          changeInputValue={onChangeTime}
          inputName='time'
          type='number'
        />
      </InputArea>
    </Wrapper>
  );
};

export default Goal;

const Wrapper = styled.section`
  margin-top: 24px;
`;
const InputArea = styled.div`
  display: flex;
  > div:nth-child(2),
  section {
    margin-left: 24px;
  }
`;
