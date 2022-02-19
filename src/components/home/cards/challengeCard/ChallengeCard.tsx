import styled from "@emotion/styled";
import DefaultBox from "@src/components/common/defaultBox";
import { ChallengeType } from "@src/utils/interfaces/challenge";
import { FC } from "react";

const ChallengeCard: FC<ChallengeType> = ({
  id,
  name,
  writer,
  start_at,
  end_at,
}) => {
  return (
    <>
      <DefaultBox width={288} height={164}>
        <Title>{name}</Title>
        <ChallengeWriter>
          <img src={writer.profile_image_url} alt='담임' />
          <p>{writer.name}</p>
        </ChallengeWriter>
        <ChallengeGoal>{name}</ChallengeGoal>
        <ChallengeSubInfo className='subInfo'>
          <p>
            {start_at} ~ {end_at}
          </p>
          <p>211명</p>
        </ChallengeSubInfo>
      </DefaultBox>
    </>
  );
};

export default ChallengeCard;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const ChallengeWriter = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

const ChallengeGoal = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const ChallengeSubInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.dark_gray};
`;
