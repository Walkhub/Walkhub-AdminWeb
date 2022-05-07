import styled from "@emotion/styled";
import { ChallengeType } from "@src/utils/interfaces/challenge";
import React, { FC } from "react";
import DefaultBox from "../common/defaultBox";
import Link from "next/link";

interface Props extends ChallengeType {
  type: string;
}

const ChallengeCard: FC<Props> = ({
  id,
  name,
  start_at,
  end_at,
  writer,
  image_url,
  type,
  participant_count,
}) => {
  return (
    <>
      <Link href={`/challenge/${id}`}>
        <DefaultBox width={288} height={288}>
          <CardInfo>
            <ChallengeImg alt='' src={image_url} />
            <Title>
              <p>{name}</p>
              <p>{type}</p>
            </Title>
            <Writer>
              <ProfileImg alt='' src={writer.profile_image_url} />
              <p>{writer.name}</p>
            </Writer>
            <div>챌린지 목표</div>
            <Date>
              <p>
                {start_at} ~ {end_at}
              </p>
              <p>{participant_count} 명</p>
            </Date>
          </CardInfo>
        </DefaultBox>
      </Link>
    </>
  );
};

export default ChallengeCard;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    padding: 7px 0;
  }
`;

const ChallengeImg = styled.img`
  width: 286px;
  height: 112px;
  position: relative;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
  left: -18px;
  top: -18px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    :nth-child(1) {
      width: 195px;
      color: ${({ theme }) => theme.color.black};
      font-size: 20px;
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    :nth-child(2) {
      color: ${({ theme }) => theme.color.main};
      font-size: 16px;
    }
  }
`;

const Writer = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 14px;
    color: ${({ theme }) => theme.color.black};
  }
`;

const ProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const Date = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.dark_gray};
`;
