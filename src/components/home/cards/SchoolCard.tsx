import styled from "@emotion/styled";
import DefaultBox from "@src/components/common/defaultBox";
import { SchoolType } from "@src/utils/interfaces/school";
import React, { FC } from "react";

const SchoolCard: FC<SchoolType> = ({
  school_id,
  school_name,
  ranking,
  logo_image_url,
  walk_count,
}) => {
  return (
    <>
      <DefaultBox width={392} height={108}>
        <CardBox>
          <Logo alt='' src={logo_image_url} />
          <Title>
            <p>{school_name}</p>
            <p>총 {walk_count} 걸음</p>
          </Title>
          <Rank>{ranking}등</Rank>
        </CardBox>
      </DefaultBox>
    </>
  );
};

export default SchoolCard;

const CardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  object-fit: cover;
`;

const Title = styled.div`
  p {
    width: 220px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:nth-child(1) {
      margin-bottom: 5px;
      font-size: 20px;
    }
    &:nth-child(2) {
      font-size: 14px;
    }
  }
`;

const Rank = styled.div`
  font-size: 16px;
`;
