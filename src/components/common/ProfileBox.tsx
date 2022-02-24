import styled from "@emotion/styled";

interface Props {
  name: string;
  profile_image_url?: string;
  grade: number;
  class_num: number;
}

const ProfileBox: React.FC<Props> = ({
  name,
  profile_image_url,
  grade,
  class_num,
}) => {
  return (
    <UserSchoolInfo>
      <img src={profile_image_url}></img>
      <Box>
        <h2>{name}</h2>
        <div>
          <p>{grade}학년</p>
          <p>3반</p>
          <p>{class_num}번</p>
        </div>
      </Box>
    </UserSchoolInfo>
  );
};

const UserSchoolInfo = styled.div`
  display: flex;
  gap: 28px;
  align-items: center;
  > img {
    background-color: ${({ theme }) => theme.color.main};
    border-radius: 50%;
    width: 90px;
    height: 90px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  > h2 {
    font-size: 28px;
    color: ${({ theme }) => theme.color.black};
  }
  > div {
    display: flex;
    font-size: 16px;
    gap: 16px;
    color: ${({ theme }) => theme.color.dark_gray};
  }
`;

export default ProfileBox;
