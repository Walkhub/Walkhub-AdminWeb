import MakeClass from "@src/components/class/makeclass/MakeClass";
import withAuth from "@src/hocs/withAuth";
import React from "react";

const MakeClassPage = () => {
  return <MakeClass />;
};

export default withAuth(MakeClassPage, ["ROOT", "SU", "TEACHER"]);
