import React from "react";
import ClassBanner from "@src/components/class/seeClass/ClassBanner";
import { SWRConfig } from "swr";
import fetcher from "@src/utils/function/fetcher";

export async function getStaticProps() {
  const Class = await fetcher("/classes/{section-id}");

  return {
    props: {
      fallback: {
        "/classes/{section-id}": Class,
      },
    },
  };
}

const SeeClass = ({ fallback }: any) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ClassBanner />
    </SWRConfig>
  );
};

export default SeeClass;
