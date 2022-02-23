import styled from "@emotion/styled";
import Chart from "../chart";
import DefaultModal from "../common/DefaultModal";
import ProfileBox from "../common/ProfileBox";

const UserDetail = () => {
  return (
    <DefaultModal>
      <Container>
        <UserTextInfo>
          <ProfileBox class_num={1} grade={1} name='김의찬' />
          <UserStepInfo>
            <tbody>
              <tr>
                <th>평균 걸음수</th>
                <td>2000</td>
              </tr>
              <tr>
                <th>평균 걸음수</th>
                <td>2000</td>
              </tr>
              <tr>
                <th>평균 걸음수</th>
                <td>2000</td>
              </tr>
              <tr>
                <th>평균 걸음수</th>
                <td>2000</td>
              </tr>
            </tbody>
          </UserStepInfo>
        </UserTextInfo>
        <ChartBox>
          <WeekMonthChange>
            <WeekMonthButton isClick={true}>주간</WeekMonthButton>
            <WeekMonthButton isClick={false}>월간</WeekMonthButton>
          </WeekMonthChange>
          <TimeSetBox>
            <img></img>
            <p>2월 2주차</p>
            <img></img>
          </TimeSetBox>
          <Chart countList={[1000, 3000, 2000, 5000, 4000, 5000, 2220]}></Chart>
          <CheckRecord>
            <p>기록 확인하기</p>
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
    color: ${({ theme }) => theme.color.main};
    border-bottom: 1px solid ${({ theme }) => theme.color.main};
  }
`;

export default UserDetail;
