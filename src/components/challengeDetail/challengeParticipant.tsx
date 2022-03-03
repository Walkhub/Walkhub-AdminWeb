import styled from "@emotion/styled";
import React, { useContext } from "react";
import SearchOptions, {
  participantsScopeType,
  participantOrderType,
  successScopeType,
} from "./search";
import ParticipantList from "@src/components/challengeDetail/participantList";
import { ParticipantDispatchContext } from "@src/contexts/ChallengeParticipantsOptionContext";
import { userResponseType } from "@src/utils/interfaces/challenge";

interface PropsType {
  participants: userResponseType[];
}

const ChallengeParticipant: React.FC<PropsType> = ({ participants }) => {
  const dispatch = useContext(ParticipantDispatchContext);
  const onChangeDropdownValue = (
    value: string | number,
    name: string | number
  ) => {
    if (typeof value === "number" || typeof name === "number") return;
    if (
      name !== "participantOrder" &&
      name !== "participantsScope" &&
      name !== "successScope"
    )
      return;
    const myValue = value as
      | participantOrderType
      | participantsScopeType
      | successScopeType;
    dispatch({
      type: "CHANGE_OPTION",
      dropdownName: name,
      value: myValue,
    });
  };
  const changeToExcel = () => {};
  return (
    <Wrapper>
      <SearchOptions onChangeDropdownValue={onChangeDropdownValue} />
      <ExelChange>
        <button onClick={changeToExcel}>엑셀로 변환하기</button>
      </ExelChange>
      <OptionNames>
        <strong className='optionName'>달성량</strong>
        <strong className='optionName'>달성률</strong>
        <strong className='optionName'>완료 여부</strong>
        <strong className='optionName'>완료 날짜</strong>
      </OptionNames>
      {participants !== undefined && (
        <ParticipantList participants={participants} />
      )}
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
