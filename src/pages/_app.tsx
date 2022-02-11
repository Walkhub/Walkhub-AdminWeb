import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import cookies from "next-cookies";
import { setToken } from "../utils/function/tokenManager";
import RootContextProvider from "../contexts";
import LoginContextProvider from "../contexts/LoginContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootContextProvider
      providers={[
        // provider 를 jsx tsx 형식으로 받아옵니다 에시로 login context 를 보면서 작성해주세요
        LoginContextProvider,
      ]}
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
