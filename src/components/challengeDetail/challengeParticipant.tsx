import styled from "@emotion/styled";
import React, { ChangeEvent, useContext, useEffect } from "react";
import SearchOptions, {
  participantsScopeType,
  participantSortType,
} from "@src/components/common/search/options";
import ParticipantList from "@src/components/challengeDetail/participantList";
import {
  ParticipantDispatchContext,
  ParticipantStateContext,
} from "@src/contexts/ChallengeParticipantsOptionContext";
import { userResponseType } from "@src/utils/interfaces/challenge";
import { changeToExcel } from "@src/utils/apis/default";
import getExcel, { ChallengeExelData } from "@src/utils/function/getExcel";

interface PropsType {
  participants: userResponseType[];
}

const ChallengeParticipant: React.FC<PropsType> = ({ participants }) => {
  const dispatch = useContext(ParticipantDispatchContext);
  const state = useContext(ParticipantStateContext);
  const onChangeDropdownValue = (
    value: string | number,
    name: string | number
  ) => {
    if (name !== "sort" && name !== "userScope" && name !== "grade") return;
    const myValue = value as
      | participantSortType
      | participantsScopeType
      | number;
    dispatch({
      type: "CHANGE_OPTION",
      dropdownName: name,
      value: myValue,
    });
  };
  const onChangeNameValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name !== "name" && e.target.name !== "classNum") return;
    dispatch({
      type: "CHANGE_INPUT",
      name: e.target.name,
      value: e.target.value,
    });
  };
  const downloadExel = async () => {
    const exelData: ChallengeExelData[] = participants.map(item => {
      console.log(item);
      return {
        name: item.name,
        school_name: item.school_name,
        grade: item.grade,
        class_num: item.class_num,
        number: item.number,
        total_value: item.total_value,
        progress: item.progress,
        is_success: item.is_success,
        success_date: item.success_date,
      };
    });
    console.log(exelData);
    getExcel(exelData, "CHALLENGE");
  };
  useEffect(() => {
    if (state.userScope !== "STUDENT") {
      dispatch({ type: "CHANGE_OPTION", dropdownName: "grade", value: null });
      dispatch({
        type: "CHANGE_INPUT",
        name: "classNum",
        value: "",
      });
    }
  }, [state.userScope]);
  console.log(participants);
  return (
    <Wrapper>
      <SearchOptions
        onChangeDropdownValue={onChangeDropdownValue}
        onChangeInputValue={onChangeNameValue}
        state={state}
      />
      <ExelChange>
        <button onClick={downloadExel}>엑셀로 변환하기</button>
      </ExelChange>
      <OptionNames>
        <strong className='optionName'>달성량</strong>
        <strong className='optionName'>달성률</strong>
        <strong className='optionName'>완료 여부</strong>
        <strong className='optionName'>완료 날짜</strong>
      </OptionNames>
      {participants && <ParticipantList participants={participants} />}
    </Wrapper>
  );
};

export default ChallengeParticipant;

const Wrapper = styled.section`
  margin-top: 40px;
`;
const ExelChange = styled.section`
  display: flex;
  justify-content: flex-end;
  > button {
    cursor: pointer;
    color: #57b4f1;
    margin-top: 12px;
    text-decoration: underline;
    background-color: transparent;
    font-size: 14px;
    line-height: 28px;
    font-style: normal;
    font-weight: normal;
  }
`;
const OptionNames = styled.section`
  display: flex;
  margin-top: 21px;
  justify-content: flex-end;
  > .optionName {
    font-size: 16px;
    line-height: 24px;
    font-style: normal;
    font-weight: normal;
    color: #757575;
    margin-right: 40px;
    :first-of-type {
      margin-right: 60px;
    }
  }
`;
