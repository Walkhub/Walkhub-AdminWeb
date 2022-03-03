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
  const [challenges, classes, schools, students] = await Promise.all([
    fetcher(`/challenges/lists`),
    fetcher(`/teachers/classes/lists`),
    fetcher("/ranks/schools/search?name=&schoolDateType=WEEK"),
    fetcher("/teachers/users?page=0&scope=ALL&sort=NAME&grade=&class="),
  ]);

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
