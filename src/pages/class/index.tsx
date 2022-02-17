import React from "react";
import Class from "@src/components/class/seeClass/Class";
import { SWRConfig } from "swr";
import fetcher from "@src/utils/function/fetcher";
/*
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
*/
const SeeClassPage = ({ fallback }: any) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Class />
    </SWRConfig>
  );
};

export default SeeClassPage;
