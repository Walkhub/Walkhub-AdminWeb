import React, { useCallback, useMemo, useState } from "react";
import styled from "@emotion/styled";
import {
  ChallengeDetailsType,
  goalScopeType,
  goalType,
} from "@src/utils/interfaces/challenge";
import { useRouter } from "next/dist/client/router";
import { deleteChallenge } from "@src/utils/apis/challenges";
import OutsideClickHandler from "react-outside-click-handler";
type goalObjectType = {
  [key in goalScopeType | goalType]: string;
};

const goalObject: goalObjectType = {
  WALK: "걸음",
  DISTANCE: "거리",
  ALL: "최초 1회",
  DAY: "하루 1회",
};

interface PropsType {
  challengeDetail: ChallengeDetailsType;
  id: number;
  participantsCount: number;
}

const ChallengeInfo: React.FC<PropsType> = ({
  challengeDetail,
  id,
  participantsCount,
}) => {
  const [outsideClicked, setOutsideClicked] = useState(false);
  const period = useMemo(() => {
    const startDate = challengeDetail.start_at.replace(/-/g, "/");
    const endDate = challengeDetail.end_at.replace(/-/g, "/");
    return `${startDate}~${endDate}`;
  }, [challengeDetail.start_at, challengeDetail.end_at]);
  const goal = useMemo(() => {
    return `${goalObject[challengeDetail.goal_scope]} ${
      goalObject[challengeDetail.goal_type]
    } ${challengeDetail.goal}${
      challengeDetail.goal_type === "WALK" ? "보" : "CM"
    }`;
  }, [
    challengeDetail.goal,
    challengeDetail.goal_scope,
    challengeDetail.goal_type,
  ]);
  const router = useRouter();
  const [seeMoreState, setSeeMoreState] = useState(false);
  const removeChallenge = useCallback(() => {
    deleteChallenge(id).then(() => router.push("/challenge"));
  }, [id, router]);
  const includeIn = useMemo(() => {
    if (challengeDetail.user_scope === "ALL") return "대전시 교육청";
    else if (challengeDetail.user_scope === "CLASS")
      return `${challengeDetail.grade}학년 ${challengeDetail.class_num}반`;
    else if (challengeDetail.user_scope === "SCHOOL")
      return challengeDetail.school_name;
    else return "?";
  }, [challengeDetail]);
  const seeMoreModal = useMemo(() => {
    if (seeMoreState)
      return (
        <OutsideClickHandler
          onOutsideClick={() => {
            setSeeMoreState(false);
            setOutsideClicked(true);
          }}
        >
          <OptionModal className='optionModal'>
            <button
              className='option modify'
              onClick={() => router.push("/challenge/modify/" + id)}
            >
              챌린지 수정
            </button>
            <button className='option remove' onClick={removeChallenge}>
              챌린지 삭제
            </button>
          </OptionModal>
        </OutsideClickHandler>
      );
  }, [seeMoreState, removeChallenge]);
  return (
    <Wrapper>
      <ChallengeImg img_url={challengeDetail.image_url} />
      <div>
        <div className='titleAndOption'>
          <h1 className='title'>{challengeDetail.name}</h1>
          {challengeDetail.is_mine && (
            <SeeMoreButton
              className='optionButton'
              onClick={() => {
                !outsideClicked && setSeeMoreState(true);
                setOutsideClicked(false);
              }}
            >
              <div className='dot' />
              <div className='dot' />
              <div className='dot' />
            </SeeMoreButton>
          )}
          {seeMoreModal}
        </div>
        <Period className='writerPeriodFont'>{period}</Period>
      </div>
      <Writer>
        <img
          className='userProfile'
          src={challengeDetail.writer?.profile_image_url || "asd"}
          alt='유저 프로필'
        />
        <p className='userName writerPeriodFont after'>
          {challengeDetail.writer?.name}
        </p>
        <p className='writerPeriodFont after'>{includeIn}</p>
        <p className='writerPeriodFont'>{participantsCount}명</p>
      </Writer>
      <Goal>
        <img src='https://facebook.com/favicon.ico' alt='대충 아이콘' />
        <p className='goalFont'>{goal}</p>
        <img src='https://facebook.com/favicon.ico' alt='대충 아이콘' />
        <p className='goalFont'>{challengeDetail.award}</p>
      </Goal>
      <ChallengeContent>{challengeDetail.content}</ChallengeContent>
    </Wrapper>
  );
};

export default ChallengeInfo;

const Wrapper = styled.section`
  width: 1224px;
  margin: 0 auto;
  > div {
    display: flex;
    margin-top: 20px;
    > .titleAndOption {
      display: flex;
      position: relative;
      align-items: center;
      > .title {
        color: ${({ theme }) => theme.color.black};
        font-size: 36px;
        line-height: 54px;
        font-style: normal;
        font-weight: bold;
      }
    }
  }
`;
const ChallengeImg = styled.div<{
  img_url: string;
}>`
  width: 100%;
  height: 268px;
  background-image: url(${props => props.img_url});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0 0 12px 12px;
`;
const Writer = styled.em`
  display: flex;
  margin-top: 20px;
  > .userProfile {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  > .userName {
    margin-left: 12px;
  }
  > .writerPeriodFont {
    color: ${({ theme }) => theme.color.dark_gray};
    font-size: 20px;
    line-height: 28px;
    font-style: normal;
    font-weight: normal;
  }
  > .after {
    ::after {
      content: "";
      border-right: 2px solid ${({ theme }) => theme.color.normal_gray};
      margin: 0 16px;
    }
  }
`;

const Period = styled.strong`
  margin-left: auto;
  display: flex;
  font-size: 20px;
  line-height: 28px;
  font-weight: normal;
  font-style: normal;
  color: #757575;
`;
const Goal = styled.strong`
  display: flex;
  margin-top: 20px;
  > img {
    width: 28px;
    height: 28px;
    background-color: #ffd9d9;
  }
  > .goalFont {
    font-size: 20px;
    line-height: 28px;
    color: ${({ theme }) => theme.color.black};
    font-style: normal;
    font-weight: bold;
    margin: 0 16px;
  }
`;

export const ChallengeContent = styled.strong`
  display: flex;
  margin-top: 20px;
  font-size: 20px;
  line-height: 29px;
  font-style: normal;
  font-weight: normal;
  color: ${({ theme }) => theme.color.black};
`;

const SeeMoreButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: transparent;
  margin-left: 20px;
  > .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin-right: 4px;
    background-color: black;
    :last-child {
      margin-right: 0;
    }
  }
`;

const OptionModal = styled.section`
  position: absolute;
  width: 92px;
  height: 72px;
  padding: 8px 12px;
  background-color: #ffffff;
  border-radius: 4px;
  right: 0;
  top: 39px;
  box-shadow: 0px 3px 6px #00000029;
  > .option {
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    font-style: normal;
    font-weight: normal;
    margin-bottom: 16px;
    background-color: transparent;
    :last-child {
      margin-bottom: 0;
    }
  }
  > .modify {
    color: ${({ theme }) => theme.color.black};
  }
  > .remove {
    color: #f04d51;
  }
`;
