// import Header from "@src/components/common/";
import HomePage from "@src/components/home";
import Header from "@src/components/common/header";
import fetcher from "@src/utils/function/fetcher";
import { SWRConfig } from "swr";
import { ChallengeType } from "@src/utils/interfaces/challenge";
import { FC } from "react";
import withAuth from "@src/hocs/withAuth";
import { ClassType } from "@src/utils/interfaces/class";
import { StudentType } from "@src/utils/interfaces/student";
import { SchoolListType } from "@src/utils/interfaces/school";

interface FallbackType {
  fallback: {
    "/challenges/lists": ChallengeType[];
    "/teachers/classes/lists": ClassType[];
    "/teachers/users?page=0&scope=ALL&sort=NAME&grade=&class=": StudentType[];
    "/ranks/schools/search?name=&schoolDateType=WEEK": SchoolListType;
  };
}

export async function getStaticProps() {
  const challenges = await fetcher(`/challenges/lists`);
  const classes = await fetcher(`/teachers/classes/lists`);
  const schools = await fetcher(
    "/ranks/schools/search?name=&schoolDateType=WEEK"
  );
  const students = await fetcher(
    "/teachers/users?page=0&scope=ALL&sort=NAME&grade=&class="
  );
  const notices = await fetcher(`notices/list?scope={scope}&page={page}`);
  return {
    props: {
      fallback: {
        "/challenges/lists": challenges,
        "/teachers/classes/lists": classes,
        "/teachers/users?page=0&scope=ALL&sort=NAME&grade=&class=": students,
        "/ranks/schools/search?name=&schoolDateType=WEEK": schools,
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

export default withAuth(Home, ["TEACHER", "ROOT", "SU"]);
