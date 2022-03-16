import MeasurementResult from "@src/components/userDetail/measurement";
import withAuth from "@src/hocs/withAuth";
import { NextPage } from "next";

const MeasurementResultPage: NextPage = () => {
  return (
    <>
      <MeasurementResult></MeasurementResult>
    </>
  );
};

export default withAuth(MeasurementResultPage, ["ROOT", "SU", "TEACHER"]);
