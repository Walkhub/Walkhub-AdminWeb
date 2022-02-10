import { Provider } from "react";

export const provider = <T extends {}>(
  provider: Provider<T>,
  props: T
): ProvidersType<T> => ({
  provider,
  props,
});

type ProvidersType<T> = {
  provider: Provider<T>;
  props: T;
};

const RootContextProvider: React.FC<{ providers?: ProvidersType<any>[] }> = ({
  children,
  providers = [],
}) => {
  return (
    <>
      {providers.reduceRight((acc, Comp) => {
        return <Comp.provider value={Comp.props}>{acc}</Comp.provider>;
      }, children)}
    </>
  );
};

export default RootContextProvider;
