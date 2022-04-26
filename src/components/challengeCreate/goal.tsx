import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import Dropdown from "@src/components/common/dropdown";
import TextField from "@src/components/challengeCreate/textField";
import InputHeader from "@src/components/challengeCreate/inputHeader";
import {
  ChallengeContentType,
  goalScopeType,
  goalType,
} from "@src/utils/interfaces/challenge";

interface goalScopeOptionType {
  optionName: "하루 1번" | "최초 1번";
  value: goalScopeType | "기간";
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

interface gaolOptionType {
  optionName: "걸음 수" | "거리";
  value: goalType | "조건";
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

interface PropsType {
  onChangeDropdownValue: (
    value: string | number,
    name: string | number
  ) => void;
  onChangeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
  state: ChallengeContentType;
}

const Goal: React.FC<PropsType> = ({
  onChangeDropdownValue,
  onChangeInputValue,
  state,
}) => {
  return (
    <Wrapper>
      <InputHeader disabled={false}>챌린지 목표</InputHeader>
      <InputArea>
        <Dropdown
          width={132}
          height={48}
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
          height={48}
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
          disabled={state.goal_scope === "ALL"}
          placeholder='횟수'
          inputValue={state.success_standard}
          changeInputValue={onChangeInputValue}
          inputName='success_standard'
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
  > div:nth-of-type(2),
  section {
    margin-left: 24px;
  }
`;
