import Notice from "@src/components/notice/index";
import fetcher from "@src/utils/function/fetcher";
import React from "react";
import { SWRConfig } from "swr";

/*
export async function getStaticProps() {
  const notices = await fetcher("/notices/lists");

  return {
    props: {
      fallback: {
        "/notices/lists": notices,
      },
    },
  };
}*/

const NoticePage = ({ fallback }: any) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Notice />;
    </SWRConfig>
  );
};

export default NoticePage;
