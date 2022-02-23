import fetcher from "@src/utils/function/fetcher";
import { StudentType } from "@src/utils/interfaces/student";
import React from "react";
import useSWR from "swr";
import StudentCard from "./cards/StudentCard";

const StudentList = () => {
  const { data } = useSWR(
    "/teachers/users?page=0&scope=ALL&sort=NAME&grade=&class=",
    fetcher
  );
  return (
    <>
      {data.user_list?.map((i: StudentType) => {
        return (
          <div style={{ marginBottom: "16px" }} key={i.user_id}>
            <StudentCard {...i} />
          </div>
        );
      })}
    </>
  );
};

export default StudentList;
