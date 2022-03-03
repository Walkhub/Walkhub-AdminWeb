import Header from "@src/components/common/header";
import SchoolManagement from "@src/components/schoolManagement";
import withAuth from "@src/hocs/withAuth";
import fetcher from "@src/utils/function/fetcher";
import { SchoolListType } from "@src/utils/interfaces/school";
import React, { FC } from "react";
import { SWRConfig } from "swr";

interface FallbackType {
  fallback: {
    "/ranks/schools/search?name=&schoolDateType=WEEK": SchoolListType;
  };
}

export async function getStaticProps() {
  const schools = await fetcher(
    "/ranks/schools/search?name=&schoolDateType=WEEK"
  );
  return {
    props: {
      fallback: {
        "/ranks/schools/search?name=&schoolDateType=WEEK": schools,
      },
    },
  };
}

const SchoolPage: FC<FallbackType> = ({ fallback }) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <Header />
        <SchoolManagement />
      </SWRConfig>
    </>
  );
};

export default withAuth(SchoolPage, ["SU"]);
