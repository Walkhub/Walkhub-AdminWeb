import UserDetail from "@src/components/userDetail";
import { ModalsDispatchContext } from "@src/contexts/ModalContext";
import fetcher from "@src/utils/function/fetcher";
import { StudentType } from "@src/utils/interfaces/student";
import React, { useContext } from "react";
import useSWR from "swr";
import StudentCard from "../cards/StudentCard";

const StudentList = () => {
  const { data } = useSWR(
    "/teachers/users/search?page=0&scope=ALL&sort=NAME&grade=&class=",
    fetcher
  );
  const { open } = useContext(ModalsDispatchContext);
  console.log(data?.user_list);
  return (
    <>
      {(data?.user_list || []).map((i: StudentType) => {
        return (
          <div
            style={{ marginBottom: "16px" }}
            key={i.user_id}
            onClick={() => open(UserDetail, { userId: i.user_id })}
          >
            <StudentCard {...i} />
          </div>
        );
      })}
    </>
  );
};

export default StudentList;
