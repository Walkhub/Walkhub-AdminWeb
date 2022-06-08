import React, { useState } from "react";
import styled from "@emotion/styled";
import NoticeForm from "./NoticeForm";
import MakeNotice from "./MakeNotice";
import useSWR from "swr";
import fetcher from "@src/utils/function/fetcher";
import { NoticeType } from "@src/utils/interfaces/notice";
import useAuthCheck from "@src/hooks/useAuthCheck";

const Notice = () => {
  const [makeState, setMakeState] = useState<boolean>(true);
  const MakeOnClick = () => {
    setMakeState(false);
  };

  const { data, error, mutate } = useSWR(
    `/notices/list?scope=ALL&page=0`,
    fetcher
  );

  const { isAuth } = useAuthCheck(["ROOT", "SU"]);

  if (!(data || error)) {
    return <div>로딩중</div>;
  } else
    return (
      <Wrapper>
        {isAuth &&
          (makeState ? (
            <WriteDiv onClick={MakeOnClick}>
              <em>공지사항 작성하기...</em>
            </WriteDiv>
          ) : (
            <MakeNotice setMakeState={setMakeState} mutate={mutate} />
          ))}
        <NoticeTitleDiv>
          <p>공지</p>
        </NoticeTitleDiv>
        <NoticeListDiv>
          {data.notice_list?.map((i: NoticeType) => {
            return (
              <div style={{ marginBottom: "16px" }} key={i.id}>
                <NoticeForm {...i} mutate={mutate} />
              </div>
            );
          })}
        </NoticeListDiv>
      </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 1016px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WriteDiv = styled.div`
  width: 100%;
  height: 72px;
  padding: 27px 820px 27px 27px;
  border-radius: 12px;
  margin-bottom: 36px;
  cursor: pointer;
  background: ${({ theme }) => theme.color.light_gray};
  color: ${({ theme }) => theme.color.dark_gray};
  > em {
    font-size: 18px;
  }
`;

const NoticeTitleDiv = styled.div`
  width: 100%;
  height: 41px;
  margin-bottom: 20px;
  > p {
    font-size: 28px;
    font-weight: medium;
    color: ${({ theme }) => theme.color.black};
  }
`;

const NoticeListDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Notice;
