import type { AppContext, AppProps } from "next/app";
import cookies from "next-cookies";
import { setToken } from "@src/utils/function/tokenManager";
import RootProvider from "@src/utils/function/RootProvider";
import { LoginContextProvider } from "@src/contexts";
import StyleProvider from "@src/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootProvider
      providers={[
        // provider 를 jsx tsx 형식으로 받아옵니다 에시로 login context 를 보면서 작성해주세요
        StyleProvider,
        LoginContextProvider,
      ]}
    >
      <Component {...pageProps} />
      <ToastContainer theme='colored' />
    </RootProvider>
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
