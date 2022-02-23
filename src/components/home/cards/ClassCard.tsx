import styled from "@emotion/styled";
import DefaultBox from "@src/components/common/defaultBox";
import { ClassType } from "@src/utils/interfaces/class";
import React, { FC } from "react";

const ClassCard: FC<ClassType> = ({ user_count, section, teacher }) => {
  return (
    <>
      <DefaultBox width={288} height={100}>
        <div style={{ fontSize: "20px", fontWeight: 500 }}>
          {section.grade}학년 {section.class_num}반
        </div>
        <ClassInfo>
          <div>
            <img src={teacher.profile_image_url} alt='' />
            <p>{teacher.name}</p>
          </div>
          <div>{user_count}명</div>
        </ClassInfo>
      </DefaultBox>
    </>
  );
};

export default ClassCard;

const ClassInfo = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 5px;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
  }
`;
