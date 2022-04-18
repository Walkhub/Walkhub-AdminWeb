import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { userResponseType } from "@src/utils/interfaces/challenge";

interface PropsType {
  participants: userResponseType[];
}

const ParticipantList: React.FC<PropsType> = ({ participants }) => {
  const participantList = useMemo(() => {
    return participants.map((item, index) => (
      <ParticipantBox key={index}>
        <img className='userProfile' src={item.profile_image_url} />
        <MediumFont className='name'>{item.name}</MediumFont>
        <NormalFont>{item.school_name}</NormalFont>
        <NormalFont>{item.grade && `${item.grade}학년`}</NormalFont>
        <NormalFont>{item.class_num && `${item.class_num}반`}</NormalFont>
        <NormalFont>{item.number && `${item.number}번`}</NormalFont>
        <UserProgressInfo>
          <MediumFont className='walkCount'>
            {item.total_value ? `${item.total_value}걸음` : "- -"}
          </MediumFont>
          <MediumFont className='progress'>{item.progress}%</MediumFont>
          <IsSuccess isSuccess={item.is_success}>
            {item.is_success ? "완료" : "진행중"}
          </IsSuccess>
          <MediumFont className='successDate'>
            {item.success_date || "- -"}
          </MediumFont>
        </UserProgressInfo>
      </ParticipantBox>
    ));
  }, [participants]);
  return <Wrapper>{participantList}</Wrapper>;
};
export default ParticipantList;

const Wrapper = styled.ul`
  margin-top: 8px;
`;
const ParticipantBox = styled.li`
  display: flex;
  box-sizing: border-box;
  padding: 12px 29px 12px 20px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  border-radius: 12px;
  margin-bottom: 8px;
  :last-child {
    margin-bottom: 0;
  }
  > .userProfile {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  > .name {
    margin-left: 20px;
  }
`;

const NormalFont = styled.p`
  font-size: 16px;
  font-style: normal;
  margin-left: 20px;
  font-weight: normal;
  text-align: center;
  line-height: 36px;
`;

const MediumFont = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: bold;
  color: #424242;
  text-align: center;
  line-height: 36px;
`;
const IsSuccess = styled(MediumFont)<{
  isSuccess?: boolean;
}>`
  color: ${props => (props.isSuccess ? "#57B4F1" : "#757575")};
  width: 44px;
  margin-right: 38px;
`;

const UserProgressInfo = styled.em`
  display: flex;
  margin-left: auto;
  > .walkCount {
    width: 100px;
    text-align: center;
    margin-right: 23px;
  }
  > .progress {
    width: 42px;
    margin-right: 50px;
    text-align: right;
  }
  > .successDate {
    width: 84px;
  }
`;
