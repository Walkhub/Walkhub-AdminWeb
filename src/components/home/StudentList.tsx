import React from "react";
import StudentCard from "./cards/studentCard/StudentCard";

const StudentList = () => {
  return (
    <>
      {Array(12)
        .fill(-1)
        .map(i => {
          return (
            <div style={{ marginBottom: "16px" }} key={i}>
              <StudentCard />
            </div>
          );
        })}
    </>
  );
};

export default StudentList;
