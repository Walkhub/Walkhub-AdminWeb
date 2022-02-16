import React from "react";
import ClassCard from "./cards/classCard/ClassCard";

const ClassList = () => {
  return (
    <>
      {Array(12)
        .fill(-1)
        .map(i => {
          return (
            <div style={{ marginRight: "22px" }} key={i}>
              <ClassCard />
            </div>
          );
        })}
    </>
  );
};

export default ClassList;
