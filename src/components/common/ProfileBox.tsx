import styled from "@emotion/styled";
import useSWR from "swr";
import dayjs from "dayjs";
import Image from "next/image";
interface Props {
  userId: number;
}

const ProfileBox: React.FC<Props> = ({ userId }) => {
  const { data } = useSWR(
    `/teachers/users/${userId}?startAt=${dayjs()
      .subtract(6, "day")
      .format("YYYY-MM-DD")}&endAt=${dayjs().format("YYYY-MM-DD")}`
  );

  return (
    <UserSchoolInfo>
      <img
        src={
          data?.profile_image_url ||
          "https://blog.kakaocdn.net/dn/bftRiB/btqAjaghSBk/5CcN9W5qyCU8HLylVYcXb1/img.png"
        }
        width={90}
        height={90}
        alt=''
      />
      <Box>
        <h2>{data?.name}</h2>
        <div>
          {data?.grade && data?.class_num && (
            <>
              <p>{data?.grade}학년</p>
              <p>{data?.class_num}반</p>
            </>
          )}
          <p>{data?.number ? `${data?.number}번` : "선생님"}</p>
        </div>
      </Box>
    </UserSchoolInfo>
  );
};

const UserSchoolInfo = styled.div`
  display: flex;
  gap: 28px;
  align-items: center;
  & img {
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
