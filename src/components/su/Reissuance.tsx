import React, { useState } from "react";
import styled from "@emotion/styled";
import DefaultBtn from "../common/defaultBtn/DefaultBtn";
import axios from "axios";
import ToastError from "@src/utils/function/errorMessage";
import instance from "@src/utils/axios";
import router from "next/router";
import useSWR from "swr";
import fetcher from "@src/utils/function/fetcher";

type Information = {
  inputContent: string;
  seeModal: boolean;
  school_id: number;
  btnDisable: boolean;
};

const Reissuance = () => {
  const [allContent, setAllContent] = useState<Information>({
    inputContent: "",
    seeModal: false,
    school_id: 0,
    btnDisable: true,
  });

  const { inputContent, btnDisable, school_id, seeModal } = allContent;

  const { data, mutate } = useSWR(
    `https://server.walkhub.co.kr/schools/search?name=`
  );

  const fetch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setAllContent({
      ...allContent,
      seeModal: true,
      inputContent: value,
    });

    if (value == "") {
      setAllContent({
        ...allContent,
        inputContent: value,
        seeModal: false,
        btnDisable: true,
      });
    } else
      setAllContent({
        ...allContent,
        inputContent: value,
        seeModal: true,
      });
    try {
      const res = await fetcher(
        `https://server.walkhub.co.kr/schools/search?name=${e.target.value}`
      );
      mutate(res, false);
    } catch (e) {}
  };

  const modalContent = (name: string, id: number) => {
    setAllContent({
      inputContent: name,
      seeModal: false,
      school_id: id,
      btnDisable: false,
    });
  };

  const modifyRootSubmit = async () => {
    instance
      .patch(`/su/accounts/${school_id}`)
      .then(res => {
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
      ToastError("네트워크 연결을 확인해주세요.");
    }
  };

  return (
    <Wrapper>
      <PostBox>
        <h3>비밀번호 재발급</h3>
        <p>
          학교 이름을 입력하고 확인버튼을 누르면
          <br /> 루트 선생님의 비밀번호를 재발급합니다.
        </p>
        <InputDiv>
          <SchoolInput
            placeholder='학교 이름을 입력해주세요'
            onChange={fetch}
            value={inputContent}
          />
          {seeModal ? (
            <ModalBox>
              {data?.search_school_list?.map(value => {
                return (
                  <ModalLi
                    key={value.schoool_id}
                    onClick={() => {
                      modalContent(value.school_name, value.school_id);
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
                value='확인'
                disabled={btnDisable}
                onClick={modifyRootSubmit}
              />
            </BtnDiv>
          )}
        </InputDiv>
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
  padding: 127px 104px 182px;
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
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.main};
    margin-bottom: 67px;
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

const SchoolInput = styled.input`
  width: 100%;
  height: 48px;
  padding-left: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
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

export default Reissuance;
