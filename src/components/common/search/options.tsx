import styled from "@emotion/styled";
import Dropdown from "@src/components/common/dropdown";
import { ChangeEvent, useContext } from "react";
import { ParticipantStateContext } from "@src/contexts/ChallengeParticipantsOptionContext";

export type participantSortType =
  | "SCHOOL_NAME"
  | "USER_NAME"
  | "SUCCESS_DATE"
  | "PROGRESS";

type participantOrderOptionType = {
  optionName: "학교 이름순" | "이름순" | "성공일순" | "진행도순";
  value: participantSortType;
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

interface successScopeOptionListType {
  optionName: number;
  value: number;
}

const successScopeOptionList: successScopeOptionListType[] = [
  {
    optionName: 1,
    value: 1,
  },
  {
    optionName: 2,
    value: 2,
  },
  {
    optionName: 3,
    value: 3,
  },
];

interface PropsType {
  onChangeDropdownValue: (
    value: string | number,
    name: string | number
  ) => void;
  onChangeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchOptions: React.FC<PropsType> = ({
  onChangeDropdownValue,
  onChangeInputValue,
}) => {
  const state = useContext(ParticipantStateContext);
  return (
    <Options>
      <h1 className='header'>검색</h1>
      <Search>
        <label>
          <input
            className='searchInput'
            placeholder='이름으로 검색하기'
            onChange={onChangeInputValue}
          />
        </label>
        <Dropdown
          width={136}
          height={48}
          selectedValue={state.sort}
          setSelectedValue={onChangeDropdownValue}
          optionList={participantOrderOptionList}
          disabled={false}
          padding={"12px 16px"}
          fontSize={16}
          lineHeight={28}
          fontWeight='normal'
          name='sort'
        />
        <Dropdown
          width={136}
          height={48}
          selectedValue={state.userScope}
          setSelectedValue={onChangeDropdownValue}
          optionList={participantOptionList}
          disabled={false}
          padding={"12px 16px"}
          fontSize={16}
          lineHeight={28}
          fontWeight='normal'
          name='userScope'
        />
        <Dropdown
          width={136}
          height={48}
          selectedValue={state.grade || "전체"}
          setSelectedValue={onChangeDropdownValue}
          optionList={successScopeOptionList}
          disabled={state.userScope !== "STUDENT"}
          padding='12px 16px'
          fontSize={16}
          lineHeight={28}
          fontWeight='normal'
          name='grade'
        />
        <Dropdown
          width={136}
          height={48}
          selectedValue={state.classNum || "전체"}
          setSelectedValue={onChangeDropdownValue}
          optionList={successScopeOptionList}
          disabled={state.userScope !== "STUDENT"}
          padding='12px 16px'
          fontSize={16}
          lineHeight={28}
          fontWeight='normal'
          name='classNum'
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
    width: 616px;
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
