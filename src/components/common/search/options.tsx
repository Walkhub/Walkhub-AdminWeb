import styled from "@emotion/styled";
import Dropdown from "@src/components/common/dropdown";
import { ChangeEvent, useMemo } from "react";
import { ParticipantsOptionStateType } from "@src/contexts/ChallengeParticipantsOptionContext";
import SearchIcon from "@src/assets/search.svg";
import Image from "next/image";

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
  optionName: string;
  value: number;
}

interface PropsType {
  onChangeDropdownValue: (
    value: string | number,
    name: string | number
  ) => void;
  onChangeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
  state: ParticipantsOptionStateType;
  isElementsSchool: boolean;
}

const SearchOptions: React.FC<PropsType> = ({
  onChangeDropdownValue,
  onChangeInputValue,
  state,
  isElementsSchool,
}) => {
  const gradeScopeArray: successScopeOptionListType[] = useMemo(() => {
    return Array(isElementsSchool ? 6 : 3)
      .fill(void 0)
      .map((item, index) => {
        return {
          optionName: `${index + 1}학년`,
          value: index + 1,
        };
      });
  }, [isElementsSchool]);
  return (
    <Options>
      <h1 className='header'>검색</h1>
      <Search>
        <label>
          <input
            className='name'
            placeholder='이름으로 검색하기'
            name='name'
            onChange={onChangeInputValue}
          />
          <Image src={SearchIcon} className='searchIcon' />
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
          optionList={gradeScopeArray}
          disabled={state.userScope !== "STUDENT"}
          padding='12px 16px'
          fontSize={16}
          lineHeight={28}
          fontWeight='normal'
          name='grade'
        />
        <input
          className='classNumInput'
          name='classNum'
          onChange={onChangeInputValue}
          value={state.classNum}
          readOnly={state.userScope !== "STUDENT" || state.grade === null}
          placeholder='반 입력'
          type='number'
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
    justify-content: space-between;
    display: flex;
    width: 616px;
    height: 48px;
    border: 1px solid #bdbdbd;
    border-radius: 12px;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 12px 20px;
    > .name {
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
  > .classNumInput {
    width: 136px;
    height: 48px;
    font-size: 16px;
    line-height: 24px;
    font-style: normal;
    font-weight: normal;
    height: 100%;
    border: 1px solid #bdbdbd;
    border-radius: 12px;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 12px 12px;
    margin-left: 16px;
    ::placeholder {
      color: #bdbdbd;
    }
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;
