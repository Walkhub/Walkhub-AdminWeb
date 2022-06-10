import styled from "@emotion/styled";
import DefaultModal from "@src/components/common/DefaultModal";
import { ModalsDispatchContext } from "@src/contexts/ModalContext";
import fetcher from "@src/utils/function/fetcher";
import { useContext, useState } from "react";
import useSWR from "swr";
import UserDetail from "..";
import ProfileBox from "../../common/ProfileBox";
import MeasurementCard from "./MeasurementCard";
import dayjs from "dayjs";
import BoldLeftArrow from "../../../assets/bold_left_arrow.svg";
import BoldRightArrow from "../../../assets/bold_right_arrow.svg";
import Image from "next/image";
interface Props {
  userId: number;
  startAt: dayjs.Dayjs;
  endAt: dayjs.Dayjs;
}

export interface ExerciseList {
  exercise_id: number;
  certifying_shot: string;
  walk_count: number;
  speed: number; // m/s단위
  calorie: number;
  time: number; // 분단위
  latitude: number;
  longitude: number;
  end_at: string;
}

const MeasurementResult = (props: Props) => {
  const [page, setPage] = useState<number>(0);

  const { data: exerciseList } = useSWR<{
    exercise_analysis_list: ExerciseList[];
    total_page: number;
  }>(
    `/exercises/history/${props.userId}?startAt=${props.startAt.format(
      "YYYY-MM-DD"
    )}&endAt=${props.endAt.format("YYYY-MM-DD")}&page=${page}`,
    fetcher
  );

  const { close, open } = useContext(ModalsDispatchContext);
  return (
    <DefaultModal close={() => close(MeasurementResult)}>
      <Container>
        <ProfileBox userId={props.userId}></ProfileBox>
        <CardBox>
          {page !== 0 && (
            <Image
              src={BoldLeftArrow}
              onClick={() => setPage(state => state - 1)}
            />
          )}
          <div>
            {(exerciseList?.exercise_analysis_list || []).map((i, idx) => (
              <MeasurementCard
                key={i.exercise_id}
                {...i}
                isRight={idx % 4 > 1}
              />
            ))}
          </div>
          {page !== exerciseList?.total_page - 1 && (
            <Image
              src={BoldRightArrow}
              onClick={() => setPage(state => state + 1)}
            />
          )}
        </CardBox>
        <CheckUserDetail>
          <p
            onClick={() => {
              close(MeasurementResult);
              open(UserDetail, { userId: props.userId });
            }}
          >
            유저 정보 확인하기
          </p>
        </CheckUserDetail>
      </Container>
    </DefaultModal>
  );
};

const Container = styled.div`
  width: 1016px;
  padding: 80px 104px 54px;
  display: flex;
  flex-direction: column;
`;

const CardBox = styled.div`
  display: flex;
  height: 252px;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
  position: relative;
  align-items: center;
  > span {
    position: absolute !important;
    width: 36px;
    height: 36px;
    cursor: pointer;
    background-color: black;
    :first-of-type {
      left: -60px;
    }
    :last-child {
      right: -60px;
    }
  }
  > div {
    display: flex;
    gap: 24px;
    width: 100%;
    height: 100%;
  }
`;

const CheckUserDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  > p {
    cursor: pointer;
    font-size: 14px;
    margin-top: 28px;
    color: ${({ theme }) => theme.color.main};
    border-bottom: 1px solid ${({ theme }) => theme.color.main};
  }
`;

export default MeasurementResult;
