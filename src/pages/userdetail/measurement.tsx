import MeasurementResult from "@src/components/userDetail/measurement";
import Head from "next/head";
const MeasurementResultPage = () => {
  return (
    <>
      <Head>
        <script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false`}
          defer={false}
          async={true}
        ></script>
      </Head>
      <MeasurementResult></MeasurementResult>
    </>
  );
};

export default MeasurementResultPage;
