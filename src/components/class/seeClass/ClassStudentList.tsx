import React from "react";
import fetcher from "@src/utils/function/fetcher";
import useSWR from "swr";
import { StudentType } from "@src/utils/interfaces/student";
import StudentCard from "@src/components/home/cards/StudentCard";

interface Type {
  class_code: string;
  teacher: {
    user_id: number;
    name: string;
    profile_image_url: string;
  };
  user_list: StudentType[];
}

const ClassStudentList = () => {
  // const { data } = useSWR("/teachers/classes/{section_id}", fetcher);
  const data: Type = {
    class_code: "qwerty",
    teacher: {
      user_id: 1,
      name: "teacher",
      profile_image_url: "https://~~~~",
    },
    user_list: [
      {
        user_id: 1,
        name: "user",
        profile_image_url: "https://~~~~~~",
        number: 1,
        average_walk_count: 1234, //오늘부터 7일전 까지
        total_walk_count: 12345, //오늘부터 7일전 까지
        average_distance: 235235, //오늘부터 7일전 까지
        total_distance: 123423, //오늘부터 7일전 까지
        is_teacher: false,
        class_num: null,
        grade: null,
      },
      {
        user_id: 2,
        name: "user2",
        profile_image_url: "https://~~~~~~",
        number: 1,
        average_walk_count: 1234, //오늘부터 7일전 까지
        total_walk_count: 12345, //오늘부터 7일전 까지
        average_distance: 235235, //오늘부터 7일전 까지
        total_distance: 123423, //오늘부터 7일전 까지
        is_teacher: false,
        class_num: null,
        grade: null,
      },
    ],
  };
  return (
    <>
      {data.user_list.map((i: StudentType) => {
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
