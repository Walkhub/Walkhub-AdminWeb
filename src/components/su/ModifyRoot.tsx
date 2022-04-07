import React, { useState } from "react";
import styled from "@emotion/styled";
import DefaultBtn from "../common/defaultBtn/DefaultBtn";
import axios from "axios";
import ToastError from "@src/utils/function/errorMessage";
import instance from "@src/utils/axios";
import router from "next/router";

const ModifyRoot = () => {
  const [school_id, setSchool_id] = useState<number>();
  const [btnDisable, setBtnDisable] = useState<boolean>(true);
  const [seeModal, setSeeModal] = useState<boolean>(false);
  const [inputContent, setInputContent] = useState<string>();
  const [filteredData, setFilteredData] = useState([]);

  const fetch = (e: any) => {
    setInputContent(e.target.value);
    if (e.target.value == "") {
      setSeeModal(false);
      setBtnDisable(true);
    } else setSeeModal(true);
    instance
      .get(`https://server.walkhub.co.kr/schools/search?name=${e.target.value}`)
      .then(response => {
        setFilteredData(response.data.search_school_list);
      })
      .catch(error => {
        console.log("Error getting fake data: " + error);
      });
  };

  const modalContent = (name: string, id: number) => {
    setInputContent(name);
    setSeeModal(false);
    setSchool_id(id);
    setBtnDisable(false);
  };

  const modifyRootSubmit = async () => {
    instance
      .patch(`/su/accounts/${school_id}`)
      .then(res => {
        console.log(res.data);
        const { account_id, password } = res.data;

        router.push(`/su/result?id=${account_id}&pw=${password}&type=수정`);
      })
      .catch(err => errorhandler(err));
  };

  const errorhandler = (e: unknown) => {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 401:
          return ToastError("인증에 실패하였습니다.");
        case 403:
          return ToastError("권한이 존재하지 않습니다.");
        case 404:
          return ToastError("요청 대상을 찾을 수 없습니다.");
        case 409:
          return ToastError("이미 존재합니다.");
        default:
          return ToastError("관리자에게 문의해주세요.");
      }
    } else {
      console.log(e);
      ToastError("네트워크 연결을 확인해주세요.");
    }
  };

  return (
    <Wrapper>
      <PostBox>
        <h3>루트 선생님 수정</h3>
        <p>아이디는 수정할 수 없습니다.</p>
        <InputDiv>
          <div>
            <p>학교 이름</p>
            <BlueStar>*</BlueStar>
          </div>
          <SchoolInput
            placeholder='학교 이름'
            onChange={fetch}
            value={inputContent}
          />
          {seeModal ? (
            <ModalBox>
              {filteredData.map(value => {
                return (
                  <ModalLi
                    key={value.schoool_id}
                    onClick={() => {
                      modalContent(value.school_name, value.school_id);
                      console.log(value);
                    }}
                  >
                    <ImgBox src={value.logo_image_url} />
                    <SchoolName>{value.school_name}</SchoolName>
                  </ModalLi>
                );
              })}
            </ModalBox>
          ) : (
            <BtnDiv>
              <DefaultBtn
                value='수정'
                disabled={btnDisable}
                onClick={modifyRootSubmit}
              />
            </BtnDiv>
          )}
        </InputDiv>
        <ReissuanceDiv>
          <p>루트 선생님이 비밀번호를 잊었을 경우</p>
          <h6>비밀번호 재발급</h6>
        </ReissuanceDiv>
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
  padding: 127px 104px 134px;
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

const BtnDiv = styled.div`
  margin-top: 48px;
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

const ReissuanceDiv = styled.div`
  width: 360px;
  margin-top: 70px;
  display: flex;
  > p {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.normal_gray};
    margin-right: 5px;
  }
  > h6 {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.main};
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ModalBox = styled.ul`
  width: 100%;
  height: 144px;
  margin-top: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  border-radius: 12px;
  overflow: auto;
`;

const ModalLi = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 0 8px 16px;
  :nth-of-type(2) {
    border-color: ${({ theme }) => theme.color.normal_gray};
    border-width: 1px;
    border-top-style: solid;
    border-bottom-style: solid;
  }
  :hover {
    background-color: ${({ theme }) => theme.color.main};
    cursor: pointer;
    > p {
      color: white;
    }
  }
`;

const ImgBox = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  border-radius: 16px;
`;

const SchoolName = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.black};
`;

export default ModifyRoot;
