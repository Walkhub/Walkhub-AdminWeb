import fetcher from "@src/utils/function/fetcher";
import { StudentType } from "@src/utils/interfaces/student";
import React, { FC } from "react";
import useSWR from "swr";
import StudentCard from "../cards/StudentCard";

interface Props {
  data: StudentType[];
}

const StudentList = ({ data }) => {
  return (
    <>
      {data.user_list?.map((i: StudentType) => {
        return (
          <div style={{ marginBottom: "16px" }} key={`${i.name}-${i.user_id}`}>
            <StudentCard {...i} />
          </div>
        );
      })}
    </>
  );
};

export default StudentList;
