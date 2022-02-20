import React, { useState, Dispatch, FC, SetStateAction } from "react";
import styled from "@emotion/styled";
import DefaultBtn from "../common/defaultBtn";
import { createNotice } from "@src/utils/apis/notices";
import axios from "axios";
import ToastError from "@src/utils/function/errorMessage";

interface Props {
  setMakeState: Dispatch<SetStateAction<boolean>>;
}

interface NoticePostType {
  title: string;
  content: string;
  scope: string;
}

const MakeNotice: FC<Props> = ({ setMakeState }) => {
  const [noticePost, setNoticePost] = useState<NoticePostType>({
    title: "",
    content: "",
    scope: "",
  });

  const noticeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createNotice(
        noticePost.title,
        noticePost.content,
        noticePost.scope
      );
    } catch (e) {
      errorhandler(e);
    }
  };

  const errorhandler = (e: unknown) => {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 400:
          return ToastError("모든 빈칸을 채워주세요");
        case 401:
          return ToastError("인증에 실패하였습니다.");
        case 403:
          return ToastError("권한이 존재하지 않습니다.");
        case 500:
          ToastError("관리자에게 문의해주세요");
      }
    } else {
      ToastError("네트워크 연결을 확인해주세요.");
    }
  };

  const noticeInfoChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;
    setNoticePost({
      ...noticePost,
      [name]: value,
    });
  };

  const deleteClick = () => {
    setMakeState(true);
  };

  return (
    <Wrapper onSubmit={noticeSubmit}>
      <HeadDiv>
        <select
          name='scope'
          value={noticePost.scope}
          onChange={noticeInfoChange}
        >
          <option>ALL</option>
          <option>SCHOOL</option>
        </select>
      </HeadDiv>
      <ContentDiv>
        <TitleInput
          type='text'
          name='title'
          value={noticePost.title}
          onChange={noticeInfoChange}
          placeholder='제목을 입력하세요'
        />
        <ContentInput
          name='content'
          value={noticePost.content}
          onChange={noticeInfoChange}
          placeholder='내용을 입력하세요'
        />
      </ContentDiv>
      <PostDiv>
        <DeleteBtn onClick={deleteClick}>취소</DeleteBtn>
        <DefaultBtn width={106}>작성</DefaultBtn>
      </PostDiv>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 100%;
  padding: 40px 27px 40px 27px;
  border-radius: 12px;
  margin-bottom: 36px;
  background: ${({ theme }) => theme.color.light_gray};
  display: flex;
  flex-direction: column;
`;

const HeadDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  > select {
    width: 82px;
    height: 24px;
    color: black;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 12px 20px;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  border-radius: 12px;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 120px;
  resize: none;
  padding: 12px 20px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  border-radius: 12px;
`;

const PostDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DeleteBtn = styled.button`
  cursor: pointer;
  width: 106px;
  height: 48px;
  margin-right: 20px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.main};
  border-radius: 8px;
  color: ${({ theme }) => theme.color.main};
  transition: all 0.3s;
  :hover {
    background: ${({ theme }) => theme.color.main};
    border: 1px solid ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.white};
  }
`;

export default MakeNotice;
