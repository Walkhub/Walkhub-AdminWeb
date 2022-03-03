import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import DeleteBtn from "../common/DeleteBtn";
import { NoticeType } from "@src/utils/interfaces/notice";
import { deleteNotice } from "@src/utils/apis/notices";
import axios from "axios";
import ToastError from "@src/utils/function/errorMessage";
import { KeyedMutator } from "swr";

const NoticeForm: FC<NoticeType & { mutate: KeyedMutator<any> }> = ({
  title,
  content,
  created_at,
  writer,
  id,
  mutate,
}) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [isMore, setIsMore] = useState<boolean>(true);

  const timestamp = created_at;
  const time = new Date(timestamp);
  const timeText =
    time.getFullYear() +
    "-" +
    time.getMonth() +
    "-" +
    time.getDate() +
    " " +
    time.getHours() +
    ":" +
    time.getMinutes() +
    ":" +
    time.getSeconds();

  const noticeDelete = async (e: any) => {
    e.preventDefault();
    try {
      await deleteNotice(id);
      mutate();
    } catch (e) {
      errorhandler(e);
    }
  };

  const errorhandler = (e: unknown) => {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 401:
          return ToastError("인증에 실패하였습니다.");
        case 403:
          return ToastError("권한이 존재하지 않습니다.");
        case 404:
          return ToastError("삭제할 게시물을 찾지 못했습니다.");
        default:
          return ToastError("관리자에게 문의해주세요.");
      }
    } else {
      ToastError("네트워크 연결을 확인해주세요.");
    }
  };

  return (
    <>
      <Wrapper>
        <FormHeadDiv>
          <div>
            <p>{title}</p>
            <MoreBtn onClick={() => setModalStatus(true)}>
              {modalStatus && (
                <DeleteBtn
                  width={50}
                  setModalStatus={setModalStatus}
                  value='삭제'
                  onClick={noticeDelete}
                />
              )}
            </MoreBtn>
          </div>
          <div>
            <UserDiv>
              <img src={writer.profile_image_url} alt='' />
              <p>{writer.name}</p>
            </UserDiv>
            <EtcDiv>
              <Kindmsg>학교</Kindmsg>
              <div>
                <Datemsg>{timeText}</Datemsg>
              </div>
            </EtcDiv>
          </div>
        </FormHeadDiv>
        <HR />
        <TextDiv>
          {isMore ? (
            <>
              {content.length > 140 ? (
                <>
                  {content.substring(0, 380)}
                  <button onClick={() => setIsMore(!isMore)}>...더보기</button>
                </>
              ) : (
                <p>{content}</p>
              )}
            </>
          ) : (
            <>
              <p>{content}</p>
              <button onClick={() => setIsMore(!isMore)}>간략히</button>
            </>
          )}
        </TextDiv>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 32px 28px 28px 28px;
  margin-bottom: 36px;
  border: 1px solid ${({ theme }) => theme.color.bright_gray};
  border-radius: 12px;
`;

const FormHeadDiv = styled.div`
  width: 960px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    > p {
      width: 746px;
      font-size: 20px;
      font-weight: medium;
      color: ${({ theme }) => theme.color.black};
    }
  }
`;

const MoreBtn = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: black;
`;

const HR = styled.hr`
  width: 960px;
  height: 1px;
  border: none;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.color.bright_gray};
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  > p {
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.color.black};
  }
`;

const EtcDiv = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    gap: 8px;
  }
`;

const Kindmsg = styled.p`
  font-size: 14px;
  font-weight: Medium;
  text-align: right;
  color: ${({ theme }) => theme.color.main};
`;

const Datemsg = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.dark_gray};
`;

const TextDiv = styled.div`
  width: 100%;
  > p {
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.color.black};
  }
  > button {
    cursor: pointer;
    background: none;
    font-size: 16px;
    font-weight: 600;
    :hover {
      color: ${({ theme }) => theme.color.main};
      text-decoration: underline;
    }
  }
`;

export default NoticeForm;
