import Notice from "@src/components/notice";
import React, { FC } from "react";
import Header from "@src/components/common/header";
import { NoticeType } from "@src/utils/interfaces/notice";
import fetcher from "@src/utils/function/fetcher";
import { SWRConfig } from "swr";

interface NoticeFallbackType {
  fallback: {
    "notices/list?scope={scope}&page={page}": NoticeType[];
  };
}

export async function getStaticProps() {
  const notices = await fetcher(`notices/list?scope={scope}&page={page}`);
  return {
    props: {
      fallback: {
        "/notices/list?scope={scope}&page={page}": notices,
      },
    },
  };
}

const NoticePage: FC<NoticeFallbackType> = ({ fallback }) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <Header />
        <Notice />
      </SWRConfig>
    </>
  );
};

export default NoticePage;
