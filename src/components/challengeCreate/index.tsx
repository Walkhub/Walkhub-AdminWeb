import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import TextField from "@src/components/challengeCreate/textField";
import { ChallengeContentType } from "@src/utils/interfaces/challenge";
import UserScope from "@src/components/challengeCreate/userScope";
import ImageUpload from "@src/components/challengeCreate/imageUpload";
import Goal from "@src/components/challengeCreate/goal";
import DefaultBtn from "@src/components/common/defaultBtn/DefaultBtn";
import {
  changeChallenge,
  createChallenge,
  getChallengeDetails,
} from "@src/utils/apis/challenges";
import { createImage } from "@src/utils/apis/default";
import ToastError from "@src/utils/function/errorMessage";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { PageType } from "@src/pages/challenge/create";

interface PropsType {
  pageType: PageType;
  id?: string;
}

const Challenge: React.FC<PropsType> = ({ pageType, id }) => {
  const [challengeContent, setChallengeContent] =
    useState<ChallengeContentType>({
      name: "",
      content: "",
      image_url: null,
      start_at: "",
      end_at: "",
      award: "",
      user_scope: "SCHOOL",
      goal: null,
      goal_type: null,
      goal_scope: null,
      success_standard: null,
      grade: null,
    });
  useEffect(() => {
    if (id)
      pageType === "modify" &&
        getChallengeDetails(Number(id)).then(res => {
          console.log(res);
          setChallengeContent({
            ...challengeContent,
            name: res.name,
            content: res.content,
            image_url: res.image_url,
            start_at: res.start_at.replace(/-/g, ""),
            end_at: res.end_at.replace(/-/g, ""),
            award: res.award,
            user_scope: res.user_scope,
            goal: res.goal,
            goal_type: res.goal_type,
            goal_scope: res.goal_scope,
            success_standard: res.success_standard,
          });
        });
  }, [pageType]);
  const [file, setFile] = useState<File | null>(null);
  const { name, content, start_at, end_at, award } = challengeContent;
  const router = useRouter();
  const onChangeInputValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      if (e.target.files) {
        setFile(e.target.files[0]);
        return;
      }
      if (e.target.name == "goal" || e.target.name === "success_standard") {
        setChallengeContent({
          ...challengeContent,
          [e.target.name]: Number(e.target.value),
        });
        return;
      }
      setChallengeContent({
        ...challengeContent,
        [e.target.name]: e.target.value,
      });
    },
    [challengeContent]
  );
  const onChangeDropdownValue = (
    value: string | number,
    name: string | number
  ) => {
    setChallengeContent({
      ...challengeContent,
      [name]: value,
    });
  };
  const judgeRequestAPI = (img: string) => {
    if (pageType === "create") {
      createChallenge({
        ...challengeContent,
        image_url: img,
        grade: challengeContent.grade as number,
        start_at: `${start_at.substr(0, 4)}-${start_at.substr(
          4,
          2
        )}-${start_at.substr(6, 2)}`,
        end_at: `${end_at.substr(0, 4)}-${end_at.substr(4, 2)}-${end_at.substr(
          6,
          2
        )}`,
      });
    } else {
      if (id)
        changeChallenge({
          ...challengeContent,
          grade: challengeContent.grade as number,
          start_at: `${start_at.substr(0, 4)}-${start_at.substr(
            4,
            2
          )}-${start_at.substr(6, 2)}`,
          end_at: `${end_at.substr(0, 4)}-${end_at.substr(
            4,
            2
          )}-${end_at.substr(6, 2)}`,
          challenge_id: Number(id),
        });
    }
  };
  const onClickSubmit = useCallback(async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("images", file);
        const image = await createImage(formData).then(res => {
          return res.data.image_url[0];
        });
        await judgeRequestAPI(image);
        return;
      }
      judgeRequestAPI("");
      success_handler();
    } catch (err) {
      errorHandler(err);
    }
  }, [challengeContent, file]);
  const success_handler = () => {
    router.push("/challenge");
  };
  const errorHandler = (e: unknown) => {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 400:
          ToastError("모든 빈칸을 채워주세요.");
          break;
        case 401:
          ToastError("로그인 상태를 다시 확인해 주세요.");
          break;
        case 403:
          ToastError("챌린지를 생성할 수 있는 권한이 없습니다.");
          break;
        case 500:
          ToastError("관리자에게 문의해주세요");
          break;
      }
    } else {
      ToastError("네트워크 연결을 확인해주세요.");
    }
  };
  const date = new Date();
  const today = `${date.getFullYear()}${
    date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }${date.getDate()}`;
  useEffect(() => {
    if (challengeContent.goal_scope === "ALL") {
      setChallengeContent({
        ...challengeContent,
        success_standard: 1,
      });
    }
  }, [challengeContent.goal_scope]);
  useEffect(() => {
    if (challengeContent.user_scope === "SCHOOL") {
      setChallengeContent({
        ...challengeContent,
        grade: null,
      });
    }
  }, [challengeContent.user_scope]);
  return (
    <Wrapper>
      <ChallengeBox>
        <header className='challengeHeader'>
          챌린지 {pageType === "create" ? "생성" : "수정"}
        </header>
        <InputsArea>
          <TextField
            width={392}
            disabled={false}
            placeholder='챌린지 이름'
            inputValue={name}
            changeInputValue={onChangeInputValue}
            summary='챌린지 이름'
            type='text'
            inputName='name'
          />
          <UserScope
            changeUserScopeValue={onChangeDropdownValue}
            challengeContent={challengeContent}
          />
          <ImageUpload onChangeInputValue={onChangeInputValue} value={file} />
          <TextField
            width={392}
            disabled={false}
            placeholder={"챌린지 보상"}
            inputValue={award}
            changeInputValue={onChangeInputValue}
            summary='챌린지 보상'
            type='text'
            inputName='award'
          />
          <TextField
            width={392}
            disabled={pageType === "modify" && Number(start_at) < Number(today)}
            placeholder='ex.20220218'
            inputValue={start_at}
            changeInputValue={onChangeInputValue}
            summary='시작일'
            type='number'
            inputName='start_at'
          />
          <TextField
            width={392}
            disabled={false}
            placeholder='ex.20220218'
            inputValue={end_at}
            changeInputValue={onChangeInputValue}
            summary='종료일'
            type='number'
            inputName='end_at'
          />
          <Goal
            onChangeInputValue={onChangeInputValue}
            onChangeDropdownValue={onChangeDropdownValue}
            state={challengeContent}
          />
          <TextField
            width={808}
            disabled={false}
            placeholder='챌린지 내용'
            inputValue={content}
            summary='챌린지 내용'
            changeInputValue={onChangeInputValue}
            inputName='content'
            type='text'
          />
        </InputsArea>
        <DefaultBtn
          onClick={onClickSubmit}
          width={184}
          value={pageType === "create" ? "생성하기" : "수정하기"}
        />
      </ChallengeBox>
    </Wrapper>
  );
};

export default Challenge;

const Wrapper = styled.section`
  width: 100%;
  min-height: calc(100vh - 60px);
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.light_gray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChallengeBox = styled.section`
  width: 1016px;
  height: 828px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 12px;
  padding: 86px 104px 47px 104px;
  > .challengeHeader {
    color: ${({ theme }) => theme.color.black};
    font-size: 32px;
    line-height: 48px;
    font-weight: bold;
    font-style: normal;
  }
  > input[type="button"] {
    margin-top: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
  }
`;

export const InputsArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  > .textFieldWrapper {
    margin-top: 24px;
  }
  > .award {
    margin-left: auto;
  }
  > .end_at {
    margin-left: auto;
  }
`;
