import styled from "@emotion/styled";
import DefaultModal from "@src/components/common/DefaultModal";
import ProfileBox from "../../common/ProfileBox";
import MeasurementCard from "./MeasurementCard";

const MeasurementResult = () => {
  return (
    <DefaultModal>
      <Container>
        <ProfileBox class_num={1} grade={1} name='김의찬'></ProfileBox>
        <CardBox>
          <img />
          <MeasurementCard id={1}></MeasurementCard>
          <MeasurementCard id={2}></MeasurementCard>
          <MeasurementCard isRight={true} id={3}></MeasurementCard>
          <MeasurementCard isRight={true} id={4}></MeasurementCard>
          <img />
        </CardBox>
        <CheckUserDetail>
          <p>유저 정보 확인하기</p>
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
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
  position: relative;
  align-items: center;
  > img {
    position: absolute;
    width: 36px;
    height: 36px;
    cursor: pointer;
    background-color: black;
    :first-child {
      left: -60px;
    }
    :last-child {
      right: -60px;
    }
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
