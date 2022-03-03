import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { DetailClassType } from "@src/utils/interfaces/detailClass";
import Dropdown from "@src/components/common/dropdown";
import ClassStudentList from "./ClassStudentList";

interface optionListType {
  value: string;
  optionName: string;
}

const scopeList: optionListType[] = [
  {
    value: "NAME",
    optionName: "이름순",
  },
  {
    value: "DISTANCE",
    optionName: "거리순",
  },
  {
    value: "WALK_COUNT",
    optionName: "걸음순",
  },
  {
    value: "GCN",
    optionName: "학번순",
  },
];

const ClassBanner: FC<DetailClassType> = ({ class_cord, teacher }) => {
  const [type, setType] = useState({
    scope: "NAME",
  });

  const changeType = (value: string, name: string) => {
    console.log(type);
    setType({
      ...type,
      [name]: value,
    });
  };

  return (
    <Wrapper>
      <Banner>
        <DetailBtnDiv>
          <DetailBtn>
            <Moresection>
              <Option>
                <p>클래스 폐쇄</p>
              </Option>
            </Moresection>
          </DetailBtn>
        </DetailBtnDiv>
        <BannerDiv1>
          <ClassName>n학년 n반</ClassName>
          <ClassPeopleDiv>
            <p>소속인원</p>
            <p>명</p>
          </ClassPeopleDiv>
        </BannerDiv1>
        <BannerDiv2>
          <TeacherDiv>
            <img src={teacher.profile_image_url} alt='' />
            <TeacherName>{teacher.name}</TeacherName>
            <p>선생님</p>
          </TeacherDiv>
          <ClassCodeDiv>
            <p>가입코드</p>
            <ClassCode>{class_cord}</ClassCode>
          </ClassCodeDiv>
        </BannerDiv2>
      </Banner>
      <Title>
        <p>학생 확인</p>
        <Dropdown
          width={64}
          heigth={24}
          selectedValue={type.scope}
          name='sort'
          optionList={scopeList}
          setSelectedValue={() => changeType}
          disabled={false}
          lineHeight={24}
          fontSize={16}
          fontWeight='normal'
          padding='12px 16px'
        />
      </Title>
      <TypeMenuDiv>
        <p style={{ margin: "0 80px 0 468px" }}>평균 걸음 수</p>
        <p>종합 걸음 수</p>
        <p>평균 거리</p>
        <p>종합 거리</p>
      </TypeMenuDiv>
      <StudentListDiv>
        <ClassStudentList />
      </StudentListDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 1224px;
  margin: 54px auto 48px;
`;

const Banner = styled.div`
  width: 100%;
  height: 268px;
  background: ${({ theme }) => theme.color.main};
  border-radius: 12px;
`;

const DetailBtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DetailBtn = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-top: 28px;
  margin-right: 20px;
  background: #ffffff;
`;

const Moresection = styled.section`
  width: 100px;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 3px 6px #00000029;
  background-color: #ffffff;
  margin-top: 30px;
  position: relative;
  z-index: 99;
`;

const Option = styled.button`
  width: 100px;
  height: 36px;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 6px 10px;
  border-radius: 4px;
  box-shadow: 0px 3px 6px #00000029;
  background: white;
  position: absolute;
  right: 88px;
  border: none;
  cursor: pointer;
  > p {
    font-size: 14px;
    font-weight: normal;
    color: #f04d51;
  }
  :after {
    content: "";
    width: 131.6px;
    border-bottom: 1px solid #e0e0e0;
    position: absolute;
    margin-top: 31px;
  }
  :last-child {
    :after {
      width: 0;
      height: 0;
    }
  }
`;

const BannerDiv1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 66px;
`;

const ClassName = styled.p`
  margin-left: 54px;
  font-size: 40px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.white};
`;

const ClassPeopleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  margin-top: 12px;
  > p {
    color: ${({ theme }) => theme.color.white};
    font-weight: nomal;
    text-align: right;
  }
`;

const BannerDiv2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 19px;
`;

const TeacherDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 54px;
  > p {
    color: ${({ theme }) => theme.color.white};
  }
  > img {
    width: 35px;
    height: 35px;
  }
`;

const TeacherName = styled.p`
  width: 60px;
  height: 30px;
  margin-right: 4px;
  font-size: 20px;
`;

const ClassCodeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  margin-top: 12px;
  > p {
    color: ${({ theme }) => theme.color.white};
    font-weight: nomal;
    text-align: right;
    font-size: 14px;
  }
`;

const ClassCode = styled.p`
  width: 64px;
  color: ${({ theme }) => theme.color.white};
  font-weight: medium;
  font-size: 16px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-top: 48px;
  margin-bottom: 20px;
  > p {
    font-size: 28px;
    font-style: normal;
    font-weight: medium;
    margin-right: 16px;
  }
`;

const TypeMenuDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  > p {
    margin-right: 80px;
    font-size: 16px;
    color: ${({ theme }) => theme.color.dark_gray};
  }
`;

const StudentListDiv = styled.div``;

export default ClassBanner;
