import styled from "@emotion/styled";
import fetcher from "@src/utils/function/fetcher";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Dropdown from "../common/dropdown";
import SchoolList from "./lists/SchoolList";

interface optionListType {
  value: string;
  optionName: string;
}

const scopeList: optionListType[] = [
  {
    value: "ALL",
    optionName: "전체",
  },
  {
    value: "TEACHER",
    optionName: "선생님만",
  },
  {
    value: "STUDENT",
    optionName: "학생만",
  },
];

const SchoolFilter = () => {
  const [type, setType] = useState({
    scope: "ALL",
    name: "",
  });
  // const { mutate } = useSWR(
  //   "/teachers/users?page=0&scope=ALL&sort=NAME&grade=&class=",
  //   fetcher
  // );

  useEffect(() => {
    changeFilter();
  }, [type]);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setType({
      ...type,
      [name]: value,
    });
  };

  const changeType = (value: string, name: string) => {
    console.log(type);
    setType({
      ...type,
      [name]: value,
    });
  };

  const changeFilter = async () => {
    // mutate("", false);
  };

  return (
    <>
      <Title>검색</Title>
      <SchoolSearchBox>
        <StudentSearchBar
          placeholder='이름으로 검색하기'
          name='name'
          onChange={changeName}
        />
        <Dropdown
          width={136}
          heigth={48}
          selectedValue={type.scope}
          name='sort'
          optionList={scopeList}
          setSelectedValue={changeType}
          disabled={false}
          lineHeight={24}
          fontSize={16}
          fontWeight='normal'
          padding='12px 16px'
        />
        <Dropdown
          width={136}
          heigth={48}
          selectedValue={type.scope}
          name='scope'
          optionList={scopeList}
          setSelectedValue={changeType}
          disabled={false}
          lineHeight={24}
          fontSize={16}
          fontWeight='normal'
          padding='12px 16px'
        />
      </SchoolSearchBox>

      <SchoolList />
    </>
  );
};

export default SchoolFilter;

const StudentSearchBar = styled.input`
  width: 912px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    border: 1px solid ${({ theme }) => theme.color.main};
  }
`;

const Title = styled.div`
  padding: 16px 0;
  font-size: 20px;
  font-weight: 500;
`;

const SchoolSearchBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
