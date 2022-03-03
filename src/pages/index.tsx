import HomePage from "@src/components/home";
import Header from "@src/components/common/header";
import fetcher from "@src/utils/function/fetcher";
import { SWRConfig } from "swr";
import { ChallengeType } from "@src/utils/interfaces/challenge";
import { FC } from "react";
import withAuth from "@src/hocs/withAuth";
import { ClassType } from "@src/utils/interfaces/class";
import { StudentType } from "@src/utils/interfaces/student";

interface FallbackType {
  fallback: {
    "/challenges/lists": ChallengeType[];
    "/teachers/classes/lists": ClassType[];
    "/teachers/users?page=0&scope=ALL&sort=NAME&grade=&class=": StudentType[];
  };
}

export async function getStaticProps() {
  const challenges = await fetcher(`/challenges/lists`);
  const classes = await fetcher(`/teachers/classes/lists`);
  const students = await fetcher(
    "/teachers/users?page=0&scope=ALL&sort=NAME&grade=&class="
  );
  return {
    props: {
      fallback: {
        "/challenges/lists": challenges,
        "/teachers/classes/lists": classes,
        "/teachers/users?page=0&scope=ALL&sort=NAME&grade=&class=": students,
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

export default withAuth(Home, ["TEACHER", "ROOT"]);
