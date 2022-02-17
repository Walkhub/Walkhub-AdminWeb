import React, { FC } from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import fetcher from "@src/utils/function/fetcher";

type GetClassCodeType = {
  class_code: string;
};

type ClassUserList = {
  user_id: number;
  name: string;
  profile_iamge_url: string;
  walk_count: number;
};

const GetUserList: ClassUserList[] = [
  {
    user_id: 1,
    name: "",
    profile_iamge_url: "",
    walk_count: 0,
  },
];

const ClassBanner: FC = () => {
  /*
  const { data } = useSWR("/classes/{section-id}", fetcher);

  console.log(data);
  */
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
            <p>n명</p>
          </ClassPeopleDiv>
        </BannerDiv1>
        <BannerDiv2>
          <TeacherDiv>
            <div
              style={{
                width: "35px",
                height: "35px",
                margin: "0 8px 0 0",
                background: "#ffffff",
              }}
            ></div>
            <TeacherName>좌촨익</TeacherName>
            <p>선생님</p>
          </TeacherDiv>
          <ClassCodeDiv>
            <p>가입코드</p>
            <ClassCode>#123456</ClassCode>
          </ClassCodeDiv>
        </BannerDiv2>
      </Banner>
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
width: 64px
  color: ${({ theme }) => theme.color.white}
  font-weight: medium;
  font-size: 16px;
`;

export default ClassBanner;
