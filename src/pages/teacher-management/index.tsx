import Header from "@src/components/common/header";
import TeacherManagement from "@src/components/teacherManagement";
import withAuth from "@src/hocs/withAuth";
import fetcher from "@src/utils/function/fetcher";
import { ClassType } from "@src/utils/interfaces/class";
import React, { FC } from "react";
import { SWRConfig } from "swr";

interface FallbackType {
  fallback: {
    "/teachers/lists": { auth_code: string; class_list: ClassType[] };
  };
}

export async function getStaticProps() {
  const teachers = await fetcher(`/teachers/lists`);
  const schoolInfo = await fetcher(`/ranks/schools`);
  return {
    props: {
      fallback: {
        "/teachers/lists": teachers,
        "/ranks/schools": schoolInfo,
      },
    },
  };
}

const TeacherManagementPage: FC<FallbackType> = ({ fallback }) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <TeacherManagement />
      </SWRConfig>
    </>
  );
};

export default withAuth(TeacherManagementPage, ["ROOT"]);
