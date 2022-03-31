import styled from "@emotion/styled";
import Dropdown from "../common/dropdown";
import { useContext } from "react";
import { ParticipantStateContext } from "@src/contexts/ChallengeParticipantsOptionContext";

export type participantOrderType =
  | "SCHOOL_NAME"
  | "USER_NAME"
  | "SUCCESS_DATE"
  | "PROGRESS";

type participantOrderOptionType = {
  optionName: "학교 이름순" | "이름순" | "성공일순" | "진행도순";
  value: participantOrderType;
};

const participantOrderOptionList: participantOrderOptionType[] = [
  {
    optionName: "학교 이름순",
    value: "SCHOOL_NAME",
  },
  {
    optionName: "이름순",
    value: "USER_NAME",
  },
  {
    optionName: "성공일순",
    value: "SUCCESS_DATE",
  },
  {
    optionName: "진행도순",
    value: "PROGRESS",
  },
];

export type participantsScopeType = "ALL" | "STUDENT" | "TEACHER";

interface participantOptionListType {
  optionName: "전체" | "학생" | "선생님";
  value: participantsScopeType;
}

const participantOptionList: participantOptionListType[] = [
  {
    optionName: "전체",
    value: "ALL",
  },
  {
    optionName: "학생",
    value: "STUDENT",
  },
  {
    optionName: "선생님",
    value: "TEACHER",
  },
];

export type successScopeType = "TURE" | "FALSE" | "ALL";

interface successScopeOptionListType {
  optionName: "성공" | "실패" | "전체";
  value: successScopeType;
}

const successScopeOptionList: successScopeOptionListType[] = [
  {
    optionName: "전체",
    value: "ALL",
  },
  {
    optionName: "성공",
    value: "TURE",
  },
  {
    optionName: "실패",
    value: "FALSE",
  },
];

interface PropsType {
  onChangeDropdownValue: (
    value: string | number,
    name: string | number
  ) => void;
}

const SearchOptions: React.FC<PropsType> = ({ onChangeDropdownValue }) => {
  const state = useContext(ParticipantStateContext);
  return (
    <Options>
      <h1 className='header'>검색</h1>
      <Search>
        <label>
          <input className='searchInput' placeholder='이름으로 검색하기' />
        </label>
        <Dropdown
          width={136}
          height={48}
          selectedValue={state.participantOrder}
          setSelectedValue={onChangeDropdownValue}
          optionList={participantOrderOptionList}
          disabled={false}
          padding={"12px 16px"}
          fontSize={16}
          lineHeight={28}
          fontWeight='normal'
          name='participantOrder'
        />
        <Dropdown
          width={136}
          height={48}
          selectedValue={state.participantsScope}
          setSelectedValue={onChangeDropdownValue}
          optionList={participantOptionList}
          disabled={false}
          padding={"12px 16px"}
          fontSize={16}
          lineHeight={28}
          fontWeight='normal'
          name='participantsScope'
        />
        <Dropdown
          width={136}
          height={48}
          selectedValue={state.successScope}
          setSelectedValue={onChangeDropdownValue}
          optionList={successScopeOptionList}
          disabled={state.participantsScope !== "STUDENT"}
          padding='12px 16px'
          fontSize={16}
          lineHeight={28}
          fontWeight='normal'
          name='successScope'
        />
      </Search>
    </Options>
  );
};

export default SearchOptions;

const Options = styled.section`
  > .header {
    font-size: 20px;
    line-height: 28px;
    font-style: normal;
    font-weight: bold;
  }
`;
const Search = styled.section`
  display: flex;
  margin-top: 16px;
  > label {
    display: flex;
    width: 768px;
    height: 48px;
    border: 1px solid #bdbdbd;
    border-radius: 12px;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 12px 20px;
    > .searchInput {
      width: calc(100% - 43px);
      font-size: 16px;
      line-height: 24px;
      font-style: normal;
      font-weight: normal;
      height: 100%;
      ::placeholder {
        color: #bdbdbd;
      }
    }
  }
  > div {
    margin-left: 16px;
  }
`;
