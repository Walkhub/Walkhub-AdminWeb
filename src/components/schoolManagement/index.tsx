import styled from "@emotion/styled";
import fetcher from "@src/utils/function/fetcher";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DefaultBtn from "../common/defaultBtn/DefaultBtn";
import Dropdown from "../common/dropdown";
import SchoolList from "../home/lists/SchoolList";

interface optionListType {
  value: string;
  optionName: string;
}

const scopeList: optionListType[] = [
  {
    value: "MONTH",
    optionName: "한 달",
  },
  {
    value: "WEEK",
    optionName: "일주일",
  },
];

const SchoolManagement = () => {
  const router = useRouter();
  const [type, setType] = useState({
    scope: "WEEK",
    name: "",
  });
  const { mutate } = useSWR(
    "/ranks/schools/search?name=&schoolDateType=WEEK",
    fetcher
  );

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
    const { name, scope } = type;
    const updateData = await fetcher(
      `/rank/schooks/search?name=${name}&schoolDateType=${scope}`
    );
    mutate(updateData, false);
  };

  const onRootCreate = () => {
    router.push("/su/create");
  };

  return (
    <SchoolManagementBox>
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
        <DefaultBtn width={184} onClick={onRootCreate}>
          루트 선생님 생성
        </DefaultBtn>
      </SchoolSearchBox>

      <SchoolList />
    </SchoolManagementBox>
  );
};

export default SchoolManagement;

const SchoolManagementBox = styled.div`
  width: 1224px;
  margin: 0 auto;
  margin-top: 48px;
`;

const StudentSearchBar = styled.input`
  width: 870px;
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

const SchoolSearchBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
