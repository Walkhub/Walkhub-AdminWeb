import React, { useState, Dispatch, FC, SetStateAction } from "react";
import styled from "@emotion/styled";
import DefaultBtn from "../common/defaultBtn/DefaultBtn";
import { createNotice } from "@src/utils/apis/notices";
import axios from "axios";
import ToastError from "@src/utils/function/errorMessage";
import DropDown from "../common/dropdown";
import { KeyedMutator } from "swr";
import useAuthCheck from "@src/hooks/useAuthCheck";

interface optionListType {
  value: string;
  optionName: string;
}

const allSortList: optionListType[] = [
  {
    value: "ALL",
    optionName: "전체",
  },
];

const schoolSortList: optionListType[] = [
  {
    value: "SCHOOL",
    optionName: "학교",
  },
];

interface Props {
  setMakeState: Dispatch<SetStateAction<boolean>>;
}

interface NoticePostType {
  title: string;
  content: string;
  scope: string;
}

const MakeNotice: FC<Props & { mutate: KeyedMutator<any> }> = ({
  setMakeState,
  mutate,
}) => {
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
      mutate("/notices");
      setNoticePost({
        ...noticePost,
        title: "",
        content: "",
      });
      setMakeState(true);
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
          return ToastError(
            "인증에 실패하였습니다. 공지사항 작성은 ROOT 권한과 SU권한만 사용 가능합니다."
          );
        case 403:
          return ToastError("권한이 존재하지 않습니다.");
        default:
          return ToastError("관리자에게 문의해주세요.");
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

  const noticeSortChange = (value: string | number, name: string | number) => {
    setNoticePost({
      ...noticePost,
      [name]: value,
    });
  };

  const { isAuth } = useAuthCheck(["ROOT", "TEACHER"]);

  const deleteClick = () => {
    setMakeState(true);
  };

  return (
    <>
      <Wrapper onSubmit={noticeSubmit}>
        <HeadDiv>
          {isAuth ? (
            <DropDown
              width={85}
              height={40}
              name='scope'
              selectedValue={noticePost.scope}
              setSelectedValue={noticeSortChange}
              optionList={schoolSortList}
              disabled={false}
              fontSize={16}
              lineHeight={24}
              fontWeight='400'
              padding='8px 10px'
            />
          ) : (
            <DropDown
              width={85}
              height={40}
              name='scope'
              selectedValue={noticePost.scope}
              setSelectedValue={noticeSortChange}
              optionList={allSortList}
              disabled={false}
              fontSize={16}
              lineHeight={24}
              fontWeight='400'
              padding='8px 10px'
            />
          )}
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
          <DefaultBtn
            onClick={deleteClick}
            width={106}
            defaultColor={false}
            value='취소'
          />
          <DefaultBtn type='submit' width={106} value='작성' />
        </PostDiv>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.form`
  width: 100%;
  padding: 40px 27px 40px 27px;
  border-radius: 12px;
  margin-bottom: 36px;
  background-color: ${({ theme }) => theme.color.light_gray};
  display: flex;
  flex-direction: column;
`;

const HeadDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
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
  gap: 20px;
`;

export default MakeNotice;
