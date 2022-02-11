import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import cookies from "next-cookies";
import { setToken } from "../utils/function/tokenManager";
import RootContextProvider from "../contexts";
import NoticeContextProvider from "../contexts/NoticeContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootContextProvider providers={[NoticeContextProvider]}>
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
