import Header from "@src/components/common/header";
import CreateRoot from "@src/components/createRoot";
import withAuth from "@src/hocs/withAuth";
import React from "react";

const createRootPage = () => {
  return (
    <>
      <Header />
      <CreateRoot></CreateRoot>
    </>
  );
};

export default withAuth(createRootPage, ["SU"]);
