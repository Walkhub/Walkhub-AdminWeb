import React, { FC } from "react";
import Class from "@src/components/class/seeClass/Class";
import { SWRConfig } from "swr";
import fetcher from "@src/utils/function/fetcher";
import { DetailClassType } from "@src/utils/interfaces/detailClass";
import withAuth from "@src/hocs/withAuth";

interface FallBackType {
  fallback: {
    "/teachers/classes/{section_id}": DetailClassType;
  };
}

// export async function getServerSideProps() {
//   const schoolClass = await fetcher(`/teachers/classes/{section_id}`);
//   return {
//     props: {
//       fallback: {
//         "/teachers/classes/{section_id}": schoolClass,
//       },
//     },
//   };
// }

const SeeClassPage: FC<FallBackType & DetailClassType> = ({
  fallback,
  // class_cord,
  // teacher,
}) => {
  return (
    <>
      {/* <SWRConfig value={{ fallback }}> */}
      <Class />
      {/* </SWRConfig> */}
    </>
  );
};

export default withAuth(SeeClassPage, ["ROOT", "SU", "TEACHER"]);
