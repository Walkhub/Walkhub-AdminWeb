import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import InputHeader from "@src/components/challengeCreate/inputHeader";
import Dropdown from "@src/components/common/dropdown";
import {
  ChallengeContentType,
  gradeType,
  userScopeType,
} from "@src/utils/interfaces/challenge";
import { AuthorityType } from "@src/utils/interfaces/auth";

interface PropsType {
  changeUserScopeValue: (value: string, name: string) => void;
  challengeContent: ChallengeContentType;
  userInfo: {
    type: AuthorityType;
    grade: number;
    class_num: number;
    school_name: string;
  };
}
const UserScope: React.FC<PropsType> = ({
  changeUserScopeValue,
  challengeContent,
  userInfo,
}) => {
  const userScopeInput = useMemo(() => {
    if (userInfo.type === "TEACHER") {
      return (
        <DisabledInputBox>
          {userInfo.grade}학년 {userInfo.class_num}반
        </DisabledInputBox>
      );
    } else if (userInfo.type === "ROOT")
      return <DisabledInputBox>{userInfo.school_name}</DisabledInputBox>;
    else if (userInfo.type === "SU") {
      return <DisabledInputBox>대전 전체</DisabledInputBox>;
    }
  }, [userInfo, challengeContent, changeUserScopeValue]);
  return (
    <Wrapper>
      <InputHeader disabled={userInfo.type !== "ROOT"}>참여대상</InputHeader>
      {userScopeInput}
    </Wrapper>
  );
};

const DisabledInputBox: React.FC = ({ children }) => {
  return <div className='teacher'>{children}</div>;
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
