import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import cookies from "next-cookies";
import { setToken } from "../utils/function/tokenManager";
import RootContextProvider from "../contexts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootContextProvider
      providers={
        [
          /* 사용법 :
      provider(loginProvider :(context provider), LoginDefaultValue :(context defualt value)),
*/
        ]
      }
    >
      <Component {...pageProps} />
    </RootContextProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx, Component } = appContext;
  let appProps = {};

  if (Component.getInitialProps) {
    appProps = (await Component.getInitialProps(ctx)) || {};
  }

  const allCookies = cookies(ctx);
  const accessTokenByCookie = allCookies["accessToken"];
  if (accessTokenByCookie !== undefined) {
    const refreshTokenByCookie = allCookies["refreshToken"] || "";
    setToken(accessTokenByCookie, refreshTokenByCookie);
  }

  return { ...appProps };
};
export default MyApp;
