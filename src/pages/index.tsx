// import Header from "@src/components/common/";
import HomePage from "@src/components/home";
import Header from "@src/components/common/header";
import fetcher from "@src/utils/function/fetcher";
import { SWRConfig } from "swr";
import { ChallengeType } from "@src/utils/interfaces/challenge";
import { FC } from "react";

interface FallbackType {
  fallback: {
    "/challenges/lists": ChallengeType[];
  };
}

export async function getStaticProps() {
  const challenges = await fetcher(`/challenges/lists`);
  const classes = await fetcher(`/teachers/classes/lists`);
  return {
    props: {
      fallback: {
        "/challenges/lists": challenges,
        "/teachers/classes/lists": classes,
      },
    },
  };
}

const Home: FC<FallbackType> = ({ fallback }) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <Header />
        <HomePage />
      </SWRConfig>
    </>
  );
};

export default Home;
