import Header from "@src/components/common/header";
import TeacherManagement from "@src/components/teacherManagement";
import withAuth from "@src/hocs/withAuth";
import React from "react";

const TeacherManagementPage = () => {
  return (
    <>
      <Header />
      <TeacherManagement />
    </>
  );
};

export default withAuth(TeacherManagementPage, ["TEACHER", "ROOT"]);
