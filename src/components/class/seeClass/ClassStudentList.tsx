import React from "react";
import fetcher from "@src/utils/function/fetcher";
import useSWR from "swr";
import { StudentType } from "@src/utils/interfaces/student";
import StudentCard from "@src/components/home/cards/StudentCard";

const ClassStudentList = () => {
  const { data } = useSWR("/teachers/classes/{section_id}", fetcher);

  return (
    <>
      {data.user_list?.map((i: StudentType) => {
        return (
          <div key={i.user_id}>
            <StudentCard {...i} />
          </div>
        );
      })}
    </>
  );
};

export default ClassStudentList;
