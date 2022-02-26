import styled from "@emotion/styled";
import { TeacherType } from "@src/utils/interfaces/teacher";
import React, { FC } from "react";
import DefaultBox from "../common/defaultBox";

const TeacherCard: FC<TeacherType> = ({ teacher, section }) => {
  return (
    <>
      <DefaultBox width={288} height={100}>
        <CardInfo>
          <Image src={teacher.profile_image_url} alt='' />
          <TeacherInfo>
            <p>{teacher.name}</p>
            {section.section_id ? (
              <ClassInfo>
                {section.grade}학년 {section.class_num}반
              </ClassInfo>
            ) : (
              <ClassNone>담당 클래스가 없습니다</ClassNone>
            )}
          </TeacherInfo>
          <div>...</div>
        </CardInfo>
      </DefaultBox>
    </>
  );
};

export default TeacherCard;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto 0;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const TeacherInfo = styled.div`
  width: 150px;
  height: 100%;
  color: ${({ theme }) => theme.color.black};
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ClassInfo = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.color.dark_gray};
`;

const ClassNone = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.color.normal_gray};
`;
