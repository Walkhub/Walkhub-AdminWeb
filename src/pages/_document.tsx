import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`}
          defer={false}
          async={true}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
