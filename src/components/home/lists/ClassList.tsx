import fetcher from "@src/utils/function/fetcher";
import { ClassType } from "@src/utils/interfaces/class";
import router from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import ClassCard from "../cards/ClassCard";

const ClassList = () => {
  const [section_id, setSection_Id] = useState<number>();
  const { data } = useSWR("/teachers/classes/lists", fetcher);

  const getContent = (id: number) => {
    setSection_Id(id);
  };

  const moveClass = () => {
    router.push(`/teachers/classes/${section_id}`);
    console.log(section_id);
  };

  return (
    <>
      {data.class_list?.map(
        (i: ClassType) =>
          i.section.section_id && (
            <div
              onClick={() => {
                getContent(i.section.section_id);
                moveClass();
              }}
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
