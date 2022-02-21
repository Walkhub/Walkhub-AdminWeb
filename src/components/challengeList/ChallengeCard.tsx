import styled from "@emotion/styled";
import React from "react";
import DefaultBox from "../common/defaultBox";

const ChallengeCard = () => {
  return (
    <>
      <DefaultBox width={288} height={288}>
        <CardInfo>
          <ChallengeImg
            alt=''
            src={`data:image/jpeg;base64,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`}
          />
          <Title>
            <p>ㅈㅉㅉㅉㅉㅉㅉwwwwㅉㅉㅉㅉ</p>
            <p>진행중</p>
          </Title>
          <Writer>
            <ProfileImg
              alt=''
              src={`data:image/jpeg;base64,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`}
            />
            <p>김수완</p>
          </Writer>
          <div>챌린지 목표</div>
          <Date>
            <p>2021-12-20 ~ 2022-02-24</p>
            <p>211명</p>
          </Date>
        </CardInfo>
      </DefaultBox>
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
  width: 288px;
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