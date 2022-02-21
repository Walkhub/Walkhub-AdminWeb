import fetcher from "@src/utils/function/fetcher";
import { ClassType } from "@src/utils/interfaces/class";
import React from "react";
import useSWR from "swr";
import ClassCard from "./cards/ClassCard";

const ClassList = () => {
  const { data } = useSWR("/teachers/classes/lists", fetcher);

  console.log(data);

  return (
    <>
      {data.class_list?.map((i: ClassType) => {
        return (
          <div style={{ marginRight: "22px" }} key={i.section.section_id}>
            <ClassCard {...i} />
          </div>
        );
      })}
    </>
  );
};

export default ClassList;
