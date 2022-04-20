import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import InputHeader from "./inputHeader";
import OutsideClickHandler from "react-outside-click-handler";
import { AuthorityType } from "@src/utils/interfaces/auth";
import { getAuthority } from "@src/utils/function/localstorgeAuthority";
import { getUser } from "@src/utils/apis/users";

interface PropsType {
  pageType: PageType;
  id?: string;
}

type CalendarType = "start_at" | "end_at" | "";

const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const standardDate = new Date();
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
  const [user, setUser] = useState<{
    type: AuthorityType | null;
    grade: number | null;
    class_num: number | null;
  }>({
    type: null,
    grade: null,
    class_num: null,
  });
  useEffect(() => {
    const authority = getAuthority();
    getUser().then(res => {
      setUser({
        type: authority,
        grade: res.grade,
        class_num: res.class_num,
      });
    });
  }, []);
  useEffect(() => {
    if (user.type === "TEACHER") onChangeDropdownValue("CLASS", "user_scope");
    else if (user.type === "SU") onChangeDropdownValue("ALL", "user_scope");
  }, [user]);
  useEffect(() => {
    if (id)
      pageType === "modify" &&
        getChallengeDetails(Number(id)).then(res => {
          setChallengeContent(res);
          setSelectedDay({
            ...selectedDay,
            start_at: new Date(res.start_at),
            end_at: new Date(res.end_at),
          });
        });
  }, [pageType]);
  const [file, setFile] = useState<File | null>(null);
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
  const onChangeDropdownValue = useCallback(
    (value: string | number, name: string | number) => {
      setChallengeContent({
        ...challengeContent,
        [name]: value,
      });
    },
    [challengeContent, setChallengeContent]
  );
  const judgeRequestAPI = (img: string) => {
    if (pageType === "create") {
      createChallenge({
        ...challengeContent,
        image_url: img,
        grade: challengeContent.grade as number,
        start_at,
        end_at,
      });
    } else {
      if (id)
        changeChallenge({
          ...challengeContent,
          grade: challengeContent.grade as number,
          start_at,
          end_at,
          challenge_id: Number(id),
        });
    }
  };
  const [selectedCalnedar, setSelectedCalnedar] = useState<CalendarType>("");
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
      router.push("/challenge");
    } catch (err) {
      errorHandler(err);
    }
  }, [challengeContent, file]);
  const [selectedDay, setSelectedDay] = useState<{
    start_at: Date;
    end_at: Date;
  }>({
    start_at: new Date(),
    end_at: new Date(),
  });
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

  const onChangeDate = (value: Date) => {
    const dateToString = new Date(
      value.getTime() + value.getTimezoneOffset() + 1000 + KR_TIME_DIFF
    )
      .toISOString()
      .substring(0, 10);
    if (selectedCalnedar === "start_at") {
      setSelectedDay({
        ...selectedDay,
        start_at: value,
      });
      setChallengeContent({
        ...challengeContent,
        start_at: dateToString,
      });
    } else {
      setSelectedDay({
        ...selectedDay,
        end_at: value,
      });
      setChallengeContent({
        ...challengeContent,
        end_at: dateToString,
      });
    }
  };

  const calendar = useMemo(() => {
    return (
      <OutsideClickHandler onOutsideClick={() => setSelectedCalnedar("")}>
        <Calendar
          value={
            selectedCalnedar === "start_at"
              ? selectedDay.start_at
              : selectedDay.end_at
          }
          onChange={onChangeDate}
          calendarType='US'
          className='calendar'
          locale='kr-KR'
        />
      </OutsideClickHandler>
    );
  }, [selectedCalnedar, setSelectedCalnedar, onChangeDate, selectedDay]);
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
            userInfo={user}
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
          <section className='start_at'>
            <InputHeader disabled={false}>시작일</InputHeader>
            <CalendarInput isFocused={selectedCalnedar === "start_at"}>
              <input
                className='date'
                value={start_at}
                readOnly
                onFocus={() => setSelectedCalnedar("start_at")}
                placeholder='시작일을 선택해주세요'
              />
              <img className='calendarImg' />
            </CalendarInput>
            {selectedCalnedar === "start_at" && calendar}
          </section>
          <section className='end_at'>
            <InputHeader disabled={false}>종료일</InputHeader>
            <CalendarInput isFocused={selectedCalnedar === "end_at"}>
              <input
                className='date'
                value={end_at}
                readOnly
                onFocus={() => setSelectedCalnedar("end_at")}
                placeholder='종료일을 선택해주세요'
              />
              <img className='calendarImg' />
            </CalendarInput>
            {selectedCalnedar === "end_at" && calendar}
          </section>
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
  > .start_at,
  .end_at {
    margin-top: 24px;
    > div {
      position: relative;
      top: 8px;
      > .calendar {
        border-radius: 12px;
        box-shadow: 0px 12px 12px ${({ theme }) => theme.color.normal_gray};
        border: none;
        position: absolute;
        z-index: 99;
        width: 392px;
        > div {
          > .react-calendar__navigation__prev2-button,
          .react-calendar__navigation__next2-button {
            display: none;
          }
          > .react-calendar__navigation__prev-button,
          .react-calendar__navigation__next-button {
            font-size: 24px;
          }
        }
        > .react-calendar__viewContainer {
          > div > div > div > .react-calendar__month-view__days {
            > .react-calendar__tile--now {
              :enabled {
                background-color: transparent;
              }
              :focus {
                background-color: ${({ theme }) => theme.color.main};
              }
            }
            > .react-calendar__tile--active {
              background-color: ${({ theme }) => theme.color.main} !important;
            }
          }
        }
      }
    }
  }
`;
const CalendarInput = styled.label<{
  isFocused: boolean;
}>`
  border: 1px solid
    ${props =>
      props.isFocused ? props.theme.color.main : props.theme.color.normal_gray};
  border-radius: 12px;
  width: 392px;
  display: flex;
  align-items: center;
  padding: 12px 12px 12px 16px;
  box-sizing: border-box;
  height: 48px;
  > .date {
    width: calc(100% - 34px);
    background-color: transparent;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.color.black};
    display: flex;
    align-items: center;
    ::placeholder {
      color: ${props =>
        props.isFocused
          ? props.theme.color.black
          : props.theme.color.normal_gray};
    }
  }
  > .calendarImg {
    width: 20px;
    height: 20px;
    margin-left: auto;
  }
`;
