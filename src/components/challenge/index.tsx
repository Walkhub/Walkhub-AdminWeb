import React, { ChangeEvent, useCallback, useState } from "react";
import styled from "@emotion/styled";
import TextField from "@src/components/challenge/textField";
import { ChallengeContentType } from "@src/utils/interfaces/challenge";
import UserScope from "@src/components/challenge/userScope";
import ImageUpload from "@src/components/challenge/imageUpload";
import Goal from "@src/components/challenge/goal";
import DefaultBtn from "@src/components/common/defaultBtn/DefaultBtn";
import { createChallenge } from "@src/utils/apis/challenges";
import { createImage } from "@src/utils/apis/default";
import ToastError from "@src/utils/function/errorMessage";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { PageType } from "@src/pages/challenge/create";

interface PropsType {
  PageType: PageType;
}

const Challenge: React.FC<PropsType> = ({ PageType }) => {
  const [challengeContent, setChallengeContent] =
    useState<ChallengeContentType>({
      name: "",
      content: "",
      image_url: "",
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
  const [file, setFile] = useState<File | string>("");
  const { name, content, start_at, end_at, award } = challengeContent;
  const router = useRouter();
  const onChangeInputValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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
  const onChangeDropdownValue = (value: string, name: string) => {
    setChallengeContent({
      ...challengeContent,
      [name]: value,
    });
  };
  const onClickMakeChallenge = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append("images", file);
      await createImage(formData).then(res => {
        setChallengeContent({
          ...challengeContent,
          ["image_url"]: res.data.image_url[0],
        });
      });
      createChallenge({
        ...challengeContent,
        ["grade"]: Number(challengeContent.grade),
        ["start_at"]: `${start_at.substr(0, 4)}-${start_at.substr(
          4,
          2
        )}-${start_at.substr(6, 2)}`,
        ["end_at"]: `${end_at.substr(0, 4)}-${end_at.substr(
          4,
          2
        )}-${end_at.substr(6, 2)}`,
      });
      success_handler();
    } catch (err) {
      errorHandler(err);
    }
  }, [challengeContent, file]);
  const success_handler = () => {
    router.push("/");
  };
  const errorHandler = (e: unknown) => {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 400:
          return ToastError("모든 빈칸을 채워주세요.");
        case 401:
          ToastError("로그인 상태를 다시 확인해 주세요.");
        case 403:
          ToastError("챌린지를 생성할 수 있는 권한이 없습니다.");
        case 500:
          return ToastError("관리자에게 문의해주세요");
      }
    } else {
      ToastError("네트워크 연결을 확인해주세요.");
    }
  };
  return (
    <Wrapper>
      <ChallengeBox>
        <header className='challengeHeader'>챌린지 {PageType}</header>
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
            disabled={false}
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
        <DefaultBtn onClick={onClickMakeChallenge} width={184}>
          생성하기
        </DefaultBtn>
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
  > button {
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
