import styled from "@emotion/styled";
import { ModalsDispatchContext } from "@src/contexts/ModalContext";
import fetcher from "@src/utils/function/fetcher";
import { useContext, useState } from "react";
import useSWR from "swr";
import Chart from "../chart";
import DefaultModal from "../common/DefaultModal";
import ProfileBox from "../common/ProfileBox";
import MeasurementResult from "./measurement";
import useDays from "@src/hooks/useDays";
import Image from "next/image";
import simpleLeftArrow from "../../assets/simple_left_arrow.svg";
import simpleRightArrow from "../../assets/simple_right_arrow.svg";
interface Props {
  userId: number;
}

interface UserData {
  average_distance: number;
  average_walk_count: number;
  class_num: number | null;
  grade: number | null;
  name: string;
  number: null | number;
  profile_image_url: string;
  total_distance: number;
  total_walk_count: number;
  user_id: number;
  walk_count_list: number[];
}

const UserDetail = (props: Props) => {
  const {
    addMonth,
    addWeek,
    days,
    resetMonthDays,
    resetWeekDays,
    subMonth,
    subWeek,
  } = useDays();

  const [isWeek, setIsWeek] = useState<boolean>(true);
  const { close, open } = useContext(ModalsDispatchContext);

  const { data } = useSWR<UserData>(
    `/teachers/users/${props.userId}?startAt=${days.startAt.format(
      "YYYY-MM-DD"
    )}&endAt=${days.endAt.format("YYYY-MM-DD")}`,
    fetcher
  );

  return (
    <DefaultModal close={() => close(UserDetail)}>
      <Container>
        <UserTextInfo>
          <ProfileBox userId={props.userId} />
          <UserStepInfo>
            <tbody>
              <tr>
                <th>평균 걸음수</th>
                <td>{data?.average_walk_count}</td>
              </tr>
              <tr>
                <th>총합 걸음수</th>
                <td>{data?.total_walk_count}</td>
              </tr>
              <tr>
                <th>평균 거리(km)</th>
                <td>{data?.average_distance}</td>
              </tr>
              <tr>
                <th>총합 거리(km)</th>
                <td>{data?.total_distance}</td>
              </tr>
            </tbody>
          </UserStepInfo>
        </UserTextInfo>
        <ChartBox>
          <WeekMonthChange>
            <WeekMonthButton
              isClick={isWeek}
              onClick={() => {
                setIsWeek(true);
                resetWeekDays();
              }}
            >
              주간
            </WeekMonthButton>
            <WeekMonthButton
              isClick={!isWeek}
              onClick={() => {
                setIsWeek(false);
                resetMonthDays();
              }}
            >
              월간
            </WeekMonthButton>
          </WeekMonthChange>
          <TimeSetBox>
            <Image
              alt=''
              src={simpleLeftArrow}
              onClick={() => (isWeek ? subWeek() : subMonth())}
            ></Image>
            <p>{`${days.startAt.format("YYYY-MM-DD")} ~ ${days.endAt.format(
              "YYYY-MM-DD"
            )}`}</p>
            <Image
              alt=''
              src={simpleRightArrow}
              onClick={() => (isWeek ? addWeek() : addMonth())}
            ></Image>
          </TimeSetBox>
          <Chart
            endAt={days.endAt}
            countList={data?.walk_count_list || []}
          ></Chart>
          <CheckRecord>
            <p
              onClick={() => {
                close(UserDetail);
                open(MeasurementResult, {
                  userId: props.userId,
                  startAt: days.startAt,
                  endAt: days.endAt,
                });
              }}
            >
              기록 확인하기
            </p>
          </CheckRecord>
        </ChartBox>
      </Container>
    </DefaultModal>
  );
};

const Container = styled.div`
  width: 1016px;
  height: 556px;
  padding: 80px 104px 54px;
  display: flex;
  justify-content: space-between;
`;
const UserTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
`;

const UserSchoolInfo = styled.div`
  display: flex;
  gap: 28px;
  align-items: center;
  > img {
    background-color: aquamarine;
    border-radius: 50%;
    width: 90px;
    height: 90px;
  }
`;
const UserSchoolInfoTextBox = styled.div`
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

const UserStepInfo = styled.table`
  width: 193px;
  gap: 10px;
  > tbody > tr {
    > th {
      text-align: start;
      color: ${({ theme }) => theme.color.dark_gray};
      font-size: 18px;
      padding-bottom: 40px;
    }
    > td {
      color: ${({ theme }) => theme.color.black};
      font-size: 18px;
      padding-bottom: 40px;
    }
  }
`;

const ChartBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeekMonthChange = styled.div`
  padding-top: 24px;
  display: flex;
  gap: 40px;
  padding-bottom: 46px;
`;
const WeekMonthButton = styled.button<{ isClick: boolean }>`
  width: 74px;
  height: 24px;
  border-radius: 12px;
  font-size: 14px;
  color: ${({ isClick, theme }) =>
    isClick ? theme.color.white : theme.color.dark_gray};
  background-color: ${({ isClick, theme }) =>
    isClick ? theme.color.main : theme.color.white};
  transition: all 0.3s;
`;

const TimeSetBox = styled.div`
  display: flex;
  gap: 32px;
  padding-bottom: 34px;
  > img {
    width: 24px;
    height: 24px;
    background-color: aqua;
  }
  > p {
    color: ${({ theme }) => theme.color.black};
    font-size: 16px;
  }
`;

const CheckRecord = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  > p {
    font-size: 14px;
    cursor: pointer;
    color: ${({ theme }) => theme.color.main};
    border-bottom: 1px solid ${({ theme }) => theme.color.main};
  }
`;

export default UserDetail;
