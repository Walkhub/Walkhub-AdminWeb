import React, { useContext, useEffect, useState } from "react";
import {
  getChallengeDetails,
  getChallengeParticipants,
} from "@src/utils/apis/challenges";
import styled from "@emotion/styled";
import ChallengeInfo from "@src/components/challengeDetail/challengeInfo";
import {
  ChallengeDetailsType,
  userResponseType,
} from "@src/utils/interfaces/challenge";
import ChallengeParticipant from "@src/components/challengeDetail/challengeParticipant";
import {
  ParticipantDispatchContext,
  ParticipantStateContext,
} from "@src/contexts/ChallengeParticipantsOptionContext";
import { useRouter } from "next/dist/client/router";
import PageNation from "@src/components/common/pagenation";
import ToastError from "@src/utils/function/errorMessage";
import axios from "axios";
import withAuth from "@src/hocs/withAuth";

interface PropsType {
  challengeId: number;
}

const ChallengeDetail: React.FC<PropsType> = ({ challengeId }) => {
  const [challengeDetail, setChallengeDetail] =
    useState<ChallengeDetailsType>();
  const [participants, setParticipants] = useState<userResponseType[]>([]);
  const router = useRouter();
  const state = useContext(ParticipantStateContext);
  useEffect(() => {
    getChallengeDetails(challengeId)
      .then(res => setChallengeDetail(res))
      .catch(err => errorHandler(err));
  }, [challengeId]);
  useEffect(() => {
    getChallengeParticipants(
      challengeId,
      state.successScope,
      state.page - 1,
      state.participantOrder,
      state.participantsScope
    )
      .then(res => setParticipants(res.user_response))
      .catch(err => errorHandler(err));
  }, [
    challengeId,
    state.successScope,
    state.page,
    state.participantsScope,
    state.participantOrder,
  ]);
  const errorHandler = (e: unknown) => {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 401:
          ToastError("로그인 상태를 다시 확인해 주세요.");
          break;
        case 403:
          ToastError("챌린지를 확인 할 수 있는 권한이 없습니다.");
          router.push("/login/certification");
          break;
        case 404:
          router.push("/404");
          break;
        case 500:
          return ToastError("관리자에게 문의해주세요");
      }
    } else {
      ToastError("네트워크 연결을 확인해주세요.");
    }
  };
  const dispatch = useContext(ParticipantDispatchContext);
  const onClick = (page: number) => {
    dispatch({ type: "CHANGE_PAGE", changePageValue: page });
  };
  if (challengeDetail === undefined) return <></>;
  return (
    <Wrapper>
      <ChallengeInfo id={challengeId} challengeDetail={challengeDetail} />
      <ChallengeParticipant participants={participants} />
      <PageNation
        selectedPage={state.page}
        onClick={onClick}
        lastPage={challengeDetail.participant_count / 9}
      />
    </Wrapper>
  );
};

export default withAuth(ChallengeDetail, ["ROOT", "SU", "TEACHER"]);

const Wrapper = styled.section`
  width: 1224px;
  min-height: 100vh;
  margin: 0 auto 246px auto;
  > .title {
    color: ${({ theme }) => theme.color.black};
    font-size: 36px;
    line-height: 54px;
    font-style: normal;
    font-weight: bold;
  }
  > .pageNation {
    margin-top: 40px;
  }
`;
