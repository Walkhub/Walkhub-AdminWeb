import fetcher from "@src/utils/function/fetcher";
import { ClassType } from "@src/utils/interfaces/class";
import router from "next/router";
import React from "react";
import useSWR from "swr";
import ClassCard from "../cards/ClassCard";

const ClassList = () => {
  const { data } = useSWR("/teachers/classes/lists", fetcher);

  const moveClass = (id: number) => {
    router.push(`/class/${id}`);
  };

  return (
    <>
      {data.teacher_list?.map(
        (i: ClassType) =>
          i.section.section_id && (
            <div
              onClick={() => moveClass(i.section.section_id)}
              style={{ marginRight: "22px" }}
              key={i.section.section_id}
            >
              <ClassCard {...i} />
            </div>
          )
      )}
    </>
  );
};

export default ClassList;
