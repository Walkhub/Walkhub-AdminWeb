import { Provider } from "react";

const provider = <T extends {}>(
  provider: Provider<T>,
  props: T
): ProvidersType<T> => ({
  provider,
  props,
});

const providers: ProvidersType<any>[] = [
  /* 사용법 :
        provider(loginProvider :(context provider), LoginDefaultValue :(context defualt value)),
*/
];

type ProvidersType<T> = {
  provider: Provider<T>;
  props: T;
};

const RootContextProvider: React.FC = ({ children }) => {
  return (
    <>
      {providers.reduceRight((acc, Comp) => {
        return <Comp.provider value={Comp.props}>{acc}</Comp.provider>;
      }, children)}
    </>
  );
};

export default RootContextProvider;
