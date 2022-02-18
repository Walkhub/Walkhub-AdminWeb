import React, { useState, Dispatch, FC, SetStateAction } from "react";
import styled from "@emotion/styled";
import DefaultBtn from "../common/defaultBtn/DefaultBtn";
import { createNotice, deleteNotice } from "@src/utils/apis/notices/index";
import axios from "axios";

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

  const noticeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      createNotice(noticePost.title, noticePost.content, noticePost.scope);
    } catch (e) {}
  };

  const errorhandler = (e: unknown) => {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 400:
          alert("모든 빈칸을 채워주세요");
          return;
        case 401:
          alert("인증에 실패하였습니다.");
          return;
        case 403:
          alert("권한이 존재하지 않습니다.");
          return;
        case 500:
          alert("관리자에게 문의해주세요");
      }
    } else {
      console.log(e);
      alert("네트워크 연결을 확인해주세요.");
    }
  };

  const noticeTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNoticePost({
      ...noticePost,
      [name]: value,
    });
  };
  const noticeContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setNoticePost({
      ...noticePost,
      [name]: value,
    });
  };

  const noticeScopeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
          onChange={noticeScopeChange}
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
          onChange={noticeTitleChange}
          placeholder='제목을 입력하세요'
        />
        <ContentInput
          name='content'
          value={noticePost.content}
          onChange={noticeContentChange}
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