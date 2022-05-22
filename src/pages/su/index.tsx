import Header from "@src/components/common/header";
import SchoolManagement from "@src/components/schoolManagement";
import withAuth from "@src/hocs/withAuth";
import fetcher from "@src/utils/function/fetcher";
import { SchoolListType } from "@src/utils/interfaces/school";
import React, { FC } from "react";
import { SWRConfig } from "swr";

interface FallbackType {
  fallback: {
    "/ranks/schools/search?name=&schoolDateType=WEEK&sort=RANK&scope=ALL": SchoolListType;
  };
}

export async function getStaticProps() {
  const schools = await fetcher(
    "/ranks/schools/search?name=&schoolDateType=WEEK&sort=RANK&scope=ALL"
  );
  console.log(schools);
  return {
    props: {
      fallback: {
        "/ranks/schools/search?name=&schoolDateType=WEEK&sort=RANK&scope=ALL":
          schools,
      },
    },
  };
}

const SchoolPage = ({ fallback }) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <SchoolManagement />
      </SWRConfig>
    </>
  );
};

export default withAuth(SchoolPage, ["SU"]);
