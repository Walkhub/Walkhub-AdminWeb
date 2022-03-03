import styled from "@emotion/styled";
import fetcher from "@src/utils/function/fetcher";
import { SchoolType } from "@src/utils/interfaces/school";
import React from "react";
import useSWR from "swr";
import SchoolCard from "../cards/SchoolCard";

const SchoolList = () => {
  const { data } = useSWR(
    "/ranks/schools/search?name=&schoolDateType=WEEK",
    fetcher
  );
  return (
    <>
      <SchoolListBox>
        {data.school_list?.map((i: SchoolType) => {
          return <SchoolCard key={i.school_id} {...i} />;
        })}
      </SchoolListBox>
    </>
  );
};

export default SchoolList;

const SchoolListBox = styled.div`
  width: 1224px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  margin-top: 30px;
`;
