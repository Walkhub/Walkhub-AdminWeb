import styled from "@emotion/styled";
import DefaultBox from "@src/components/common/defaultBox";
import { StudentType } from "@src/utils/interfaces/student";
import React, { FC } from "react";

const StudentCard: FC<StudentType> = ({
  user_id,
  name,
  profile_image_url,
  grade,
  class_num,
  number,
  average_distance,
  total_distance,
  average_walk_count,
  total_walk_count,
}) => {
  return (
    <>
      <DefaultBox width={1224} height={100}>
        <StudentBox>
          <img src={profile_image_url} alt='' />
          <User>
            <p>{name}</p>
            <p>
              {grade}학년 {class_num}반 {number}번
            </p>
          </User>
          <Count style={{ gridColumn: "4 / 5" }}>{average_walk_count}</Count>
          <Count>{total_walk_count}</Count>
          <Count>{average_distance}</Count>
          <Count>{total_distance}</Count>
        </StudentBox>
      </DefaultBox>
    </>
  );
};

export default StudentCard;

const StudentBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(8, 1fr);
  place-items: center;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const User = styled.div`
  p:nth-of-type(1) {
    font-size: 18px;
    color: ${({ theme }) => theme.color.black};
  }
  p:nth-of-type(2) {
    font-size: 16px;
    color: ${({ theme }) => theme.color.dark_gray};
  }
`;

const Count = styled.p`
  font-size: 20px;
  font-weight: 500;
`;
