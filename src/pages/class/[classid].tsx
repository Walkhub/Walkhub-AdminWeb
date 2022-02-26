import React from "react";
import Class from "@src/components/class/seeClass/Class";
import useSWR from "swr";
import fetcher from "@src/utils/function/fetcher";
import { DetailClassType } from "@src/utils/interfaces/detailClass";
import { GetServerSidePropsContext } from "next";
export function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { section_id: context.query.section_id },
  };
}

const SeeClassPage = ({ section_id }: { section_id: number }) => {
  const { data } = useSWR(`/teachers/classes/${section_id}`, fetcher);

  return (
    <>
      <div>
        <Class {...data} />
      </div>
    </>
  );
};

export default SeeClassPage;
