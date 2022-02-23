import React, { useCallback, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import InputHeader from "@src/components/challenge/inputHeader";
import Dropdown from "@src/components/common/dropdown";
import {
  ChallengeContentType,
  gradeType,
  userScopeType,
} from "@src/utils/interfaces/challenge";
import useAuthority from "@src/hooks/useAuthority";
import { AuthorityType } from "@src/utils/interfaces/auth";

interface PropsType {
  changeUserScopeValue: (value: string, name: string) => void;
  challengeContent: ChallengeContentType;
}

const UserScope: React.FC<PropsType> = ({
  changeUserScopeValue,
  challengeContent,
}) => {
  const authority = useAuthority();
  const userType: AuthorityType = authority.authorityState;
  const userScopeInput = useMemo(() => {
    if (userType === "TEACHER") {
      return <DisabledInputBox>2학년 1반</DisabledInputBox>;
    } else if (userType === "ROOT")
      return (
        <UserScopeDropdown
          changeUserScopeValue={changeUserScopeValue}
          challengeContent={challengeContent}
        />
      );
    else if (userType === "SU") {
      return <DisabledInputBox>대전 전체</DisabledInputBox>;
    }
  }, [userType, challengeContent]);
  useEffect(() => {
    if (userType === "TEACHER") changeUserScopeValue("CLASS", "user_scope");
    else if (userType === "SU") changeUserScopeValue("ALL", "user_scope");
  }, [userType]);
  return (
    <Wrapper>
      <InputHeader disabled={userType !== "ROOT"}>참여대상</InputHeader>
      {userScopeInput}
    </Wrapper>
  );
};

const DisabledInputBox: React.FC = ({ children }) => {
  return <div className='teacher'>{children}</div>;
};

type userScopeOptionType = {
  optionName: "학교 전체" | "학년 전체";
  value: userScopeType;
};

type gradeOptionType = {
  optionName: "1학년" | "2학년" | "3학년" | "4학년" | "5학년" | "6학년";
  value: gradeType | "선택";
};
const userScopeOptionList: userScopeOptionType[] = [
  {
    optionName: "학교 전체",
    value: "SCHOOL",
  },
  {
    optionName: "학년 전체",
    value: "GRADE",
  },
];
const graderOptionList: gradeOptionType[] = [
  {
    optionName: "1학년",
    value: "1",
  },
  {
    optionName: "2학년",
    value: "2",
  },
  {
    optionName: "3학년",
    value: "3",
  },
  {
    optionName: "4학년",
    value: "4",
  },
  {
    optionName: "5학년",
    value: "5",
  },
  {
    optionName: "6학년",
    value: "6",
  },
];

const UserScopeDropdown: React.FC<{
  changeUserScopeValue: (value: string, name: string) => void;
  challengeContent: ChallengeContentType;
}> = ({ changeUserScopeValue, challengeContent }) => {
  const changeDropdownValue = useCallback(
    (value: string, name: string) => {
      changeUserScopeValue(value, name);
    },
    [challengeContent, changeUserScopeValue]
  );
  return (
    <DropdownWrapper>
      <Dropdown
        width={184}
        heigth={48}
        selectedValue={challengeContent.user_scope}
        setSelectedValue={changeDropdownValue}
        optionList={userScopeOptionList}
        disabled={false}
        padding={"12px 16px"}
        fontWeight={"normal"}
        fontSize={16}
        lineHeight={24}
        name='user_scope'
      />
      <Dropdown
        width={184}
        heigth={48}
        selectedValue={challengeContent.grade || "선택"}
        setSelectedValue={changeDropdownValue}
        optionList={graderOptionList}
        disabled={challengeContent.user_scope === "SCHOOL"}
        padding={"12px 16px"}
        fontWeight={"normal"}
        fontSize={16}
        lineHeight={24}
        name='grade'
      />
    </DropdownWrapper>
  );
};
export default UserScope;

const Wrapper = styled.section`
  margin-left: auto;
  margin-top: 24px;
  > .teacher {
    width: 392px;
    height: 48px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.color.normal_gray};
    padding: 12px 16px;
    color: ${({ theme }) => theme.color.normal_gray};
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;
    font-style: normal;
  }
`;
export const DropdownWrapper = styled.section`
  display: flex;
  > div {
    :last-child {
      margin-left: 24px;
    }
  }
`;
