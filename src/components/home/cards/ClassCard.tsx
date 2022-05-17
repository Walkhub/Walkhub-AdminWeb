/* eslint-disable @next/next/link-passhref */
import styled from "@emotion/styled";
import DefaultBox from "@src/components/common/defaultBox";
import { ClassType } from "@src/utils/interfaces/class";
import React, { FC } from "react";
import Link from "next/link";

const ClassCard: FC<ClassType> = ({ user_count, section, teacher }) => {
  return (
    <>
      <Link href={`/class/${section.section_id}`}>
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
      </Link>
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
