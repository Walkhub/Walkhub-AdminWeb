import styled from "@emotion/styled";
import instance from "@src/utils/axios";
import fetcher from "@src/utils/function/fetcher";
import getExcel from "@src/utils/function/getExcel";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Dropdown from "../common/dropdown";
import StudentList from "./lists/StudentList";
interface optionListType {
  value: string;
  optionName: string;
}

const sortList: optionListType[] = [
  {
    value: "NAME",
    optionName: "이름순",
  },
  {
    value: "DISTANCE",
    optionName: "거리순",
  },
  {
    value: "WALK_COUNT",
    optionName: "걸음순",
  },
  {
    value: "GCN",
    optionName: "학번순",
  },
];

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

const gradeList: optionListType[] = [
  {
    value: "",
    optionName: "전체",
  },
  {
    value: "1",
    optionName: "1학년",
  },
  {
    value: "2",
    optionName: "2학년",
  },
  {
    value: "3",
    optionName: "3학년",
  },
  {
    value: "4",
    optionName: "4학년",
  },
  {
    value: "5",
    optionName: "5학년",
  },
  {
    value: "6",
    optionName: "6학년",
  },
];

const StudentFilter = () => {
  const [type, setType] = useState({
    scope: "ALL",
    sort: "NAME",
    grade: "",
    name: "",
  });
  const { mutate } = useSWR(
    "/teachers/users?page=0&scope=ALL&sort=NAME&grade=&class=",
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

  const changeType = (value: string | number, name: string | number) => {
    console.log(type);
    setType({
      ...type,
      [name]: value,
    });
  };

  const changeFilter = async () => {
    const { scope, sort, grade, name } = type;
    const updateData = await fetcher(
      `/teachers/users/search?name=${name}&scope=${scope}&sort=${sort}&grade=${grade}&class=`
    );

    mutate(updateData, false);
  };

  const excelDownload = async () => {
    const { scope, grade } = type;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const startAt = `${year}-${month >= 10 ? month : "0" + month}-${
      date - 7 >= 10 ? date - 7 : "0" + (date - 7)
    }`;

    const endAt = `${year}-${month >= 10 ? month : "0" + month}-${
      date >= 10 ? date : "0" + date
    }`;

    console.log(startAt, endAt);

    const excelData = await instance(
      `/excel?startAt=${startAt}&endAt=${endAt}&userType=${scope}&grade=${grade}&classNum=`
    ).then(res => res.data);

    getExcel(excelData);
  };

  return (
    <>
      <Title>검색</Title>
      <StudetnSearchBox>
        <StudentSearchBar
          placeholder='이름으로 검색하기'
          name='name'
          onChange={changeName}
        />
        <Dropdown
          width={136}
          height={48}
          selectedValue={type.sort}
          name='sort'
          optionList={sortList}
          setSelectedValue={changeType}
          disabled={false}
          lineHeight={24}
          fontSize={16}
          fontWeight='normal'
          padding='12px 16px'
        />
        <Dropdown
          width={136}
          height={48}
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
        <Dropdown
          width={136}
          height={48}
          selectedValue={type.grade}
          name='grade'
          optionList={gradeList}
          setSelectedValue={changeType}
          disabled={type.scope === "TEACHER"}
          lineHeight={24}
          fontSize={16}
          fontWeight='normal'
          padding='12px 16px'
        />
      </StudetnSearchBox>

      <div onClick={excelDownload}>액셀로 변환</div>

      <Category>
        <div style={{ gridColumn: "4 / 5" }}>평균 걸음 수</div>
        <div>총합 걸음 수</div>
        <div>평균 거리(km)</div>
        <div>총합 거리(km)</div>
      </Category>

      <div>
        <StudentList />
      </div>
    </>
  );
};

export default StudentFilter;

const StudentSearchBar = styled.input`
  width: 768px;
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

const StudetnSearchBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Category = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(8, 1fr);
  font-size: 16px;
  color: ${({ theme }) => theme.color.dark_gray};
`;
