import React, { useContext } from "react";
import {
  NoticeStateContext,
  NoticeDispatchContext,
} from "../../contexts/NoticeContext";

const NoticeWrite = () => {
  const state = useContext(NoticeStateContext);
  const dispatch = useContext(NoticeDispatchContext);

  const NoticeInfoOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "title" || name === "scope")
      dispatch({ type: "NOTICE_INPUT", inputInfo: "title", value: value });
  };
};

const NoticeContentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const { value, name } = e.target;
  dispatch({ type: "NOTICE_INPUT", inputInfo: "content", value: value });
};
