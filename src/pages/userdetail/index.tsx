import UserDetail from "@src/components/userDetail";
import withAuth from "@src/hocs/withAuth";

const userDetailPage = () => {
  return <UserDetail></UserDetail>;
};

export default withAuth(userDetailPage, ["ROOT", "SU", "TEACHER"]);
