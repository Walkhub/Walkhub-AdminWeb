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
    "/challenges/web/lists?isProgress=true": ChallengeType[];
    "/teachers/classes/lists": ClassType[];
    "/teachers/users/search?userScope=STUDENT&sort=NAME&grade=&class=&name=": StudentType[];
    "/ranks/schools/search?name=&schoolDateType=WEEK&sort=RANK&scope=ALL": SchoolListType;
  };
}

export async function getStaticProps() {
  const [challenges, classes, schools, students] = await Promise.all([
    fetcher(`/challenges/web/lists?isProgress=true`),
    fetcher(`/teachers/classes/lists`),
    fetcher(
      "/ranks/schools/search?name=&schoolDateType=WEEK&sort=RANK&scope=ALL"
    ),
    fetcher(
      "/teachers/users/search?userScope=STUDENT&sort=NAME&grade=&class=&name="
    ),
  ]);

  return {
    props: {
      fallback: {
        "/challenges/web/lists?isProgress=true": challenges,
        "/teachers/classes/lists": classes,
        "/teachers/users/search?userScope=STUDENT&sort=NAME&grade=&class=&name=":
          students,
        "/ranks/schools/search?name=&schoolDateType=WEEK&sort=RANK&scope=ALL":
          schools,
      },
    },
  };
}

const Home: FC<FallbackType> = ({ fallback }) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <HomePage />
      </SWRConfig>
    </>
  );
};

export default withAuth(Home, ["TEACHER", "ROOT", "SU"]);
