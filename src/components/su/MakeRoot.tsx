import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import DefaultBtn from "../common/defaultBtn/DefaultBtn";
import axios from "axios";
import ToastError from "@src/utils/function/errorMessage";
import useSWR from "swr";
import fetcher from "@src/utils/function/fetcher";

const MakeRoot = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);

  const makeRootSubmit = async (e: any) => {
    e.preventDefault();
    try {
    } catch (e) {
      errorHandler(e);
    }
  };

  const errorHandler = (e: unknown) => {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 400:
          return ToastError("모든 빈칸을 채워주세요.");
        case 401:
          return ToastError("인증에 실패하였습니다.");
        case 403:
          return ToastError("권한이 없습니다.");
        case 409:
          return ToastError("이미 학교가 있습니다.");
      }
    }
  };

  const { mutate } = useSWR("/schools/search?name=", fetcher);

  return (
    <Wrapper>
      <PostBox>
        <h3>루트 선생님 생성</h3>
        <p>아이디와 비밀번호는 자동 생성 됩니다.</p>
        <InputDiv>
          <div>
            <p>학교 이름</p>
            <BlueStar>*</BlueStar>
          </div>
          <SchoolInput placeholder='학교 이름' />
          <ModalBox>
            <ul>
              <ModalLi>
                <ImgBox />
                <SchoolName>대덕중학교</SchoolName>
              </ModalLi>
              <ModalLi>
                <ImgBox />
                <SchoolName>대덕소프트웨어마이스터고</SchoolName>
              </ModalLi>
              <ModalLi>
                <ImgBox />
                <SchoolName>대덕고등학교</SchoolName>
              </ModalLi>
            </ul>
          </ModalBox>
        </InputDiv>
        {/*<DefaultBtn value='생성' />*/}
      </PostBox>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 100%;
  height: 100vh;
  padding: 40px 0 0;
  background-color: ${({ theme }) => theme.color.light_gray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div`
  width: 600px;
  height: 642px;
  padding: 127px 104px 183px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  > h3 {
    font-size: 32px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.black};
    margin-bottom: 12px;
  }
  > p {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.main};
    margin-bottom: 73px;
  }
`;

const InputDiv = styled.div`
  width: 392px;
  height: 84px;
  margin-bottom: 48px;
  > div {
    display: flex;
    > p {
      font-size: 16px;
      font-weight: 600;
      color: ${({ theme }) => theme.color.black};
      margin-bottom: 12px;
    }
  }
`;

const BlueStar = styled.strong`
  color: ${({ theme }) => theme.color.main};
`;

const SchoolInput = styled.input`
  width: 100%;
  height: 48px;
  padding-left: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
`;

const ModalBox = styled.div`
  width: 100%;
  height: 144px;
  margin-top: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  border-radius: 12px;
`;

const ModalLi = styled.li`
  width: 392px;
  display: flex;
  align-items: center;
  padding: 8px 0 8px 16px;
  :nth-child(2) {
    border-color: ${({ theme }) => theme.color.normal_gray};
    border-width: 1px;
    border-top-style: solid;
    border-bottom-style: solid;
  }
  :hover {
    :nth-child(1) {
      background-color: ${({ theme }) => theme.color.main};
      border-radius: 12px 12px 0 0;
    }
    :nth-child(2) {
      background-color: ${({ theme }) => theme.color.main};
    }
    :nth-child(3) {
      background-color: ${({ theme }) => theme.color.main};
      border-radius: 0 0 12px 12px;
    }
    > p {
      color: white;
    }
  }
`;

const ImgBox = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.normal_gray};
`;

const SchoolName = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.black};
`;

export default MakeRoot;
