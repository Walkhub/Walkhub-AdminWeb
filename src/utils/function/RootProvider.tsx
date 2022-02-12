import React from "react";

const RootProvider: React.FC<{ providers?: React.FC[] }> = ({
  children,
  providers = [],
}) => {
  return (
    <>
      {providers.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};

export default RootProvider;
