import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import TextField from "@src/components/challengeCreate/textField";
import UserScope from "@src/components/challengeCreate/userScope";
import ImageUpload from "@src/components/challengeCreate/imageUpload";
import Goal from "@src/components/challengeCreate/goal";
import DefaultBtn from "@src/components/common/defaultBtn/DefaultBtn";
import { PageType } from "@src/pages/challenge/create";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import InputHeader from "./inputHeader";
import OutsideClickHandler from "react-outside-click-handler";
import useChallengeContent from "@src/hooks/challenge/useChallenge";
import useCalendar from "@src/hooks/challenge/useCalendar";
import { ChallengeContentType } from "@src/utils/interfaces/challenge";
import CalendarIcon from "@src/assets/calendarIcon";

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
    });
  const {
    onChangeDate,
    selectedCalnedar,
    setSelectedCalnedar,
    selectedDay,
    setSelectedDay,
  } = useCalendar({ setChallengeContent, challengeContent });
  const {
    onChangeInputValue,
    onChangeDropdownValue,
    user,
    file,
    onClickSubmit,
  } = useChallengeContent({
    pageType,
    id,
    setSelectedDay,
    selectedDay,
    setChallengeContent,
    challengeContent,
  });
  const { name, content, start_at, end_at, award } = challengeContent;

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
              <CalendarIcon
                color={selectedCalnedar === "start_at" ? "#57B4F1" : "#bdbdbd"}
              />
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
              <CalendarIcon
                color={selectedCalnedar === "end_at" ? "#57B4F1" : "#bdbdbd"}
              />
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
  > .calendarIcon {
    width: 20px;
    height: 20px;
    margin-left: auto;
  }
`;
