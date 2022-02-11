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
      dispatch({ type: "NOTICE_INPUT", inputInfo: name, value: value });
  };

  const NoticeContentOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    if (name === "scope")
      dispatch({ type: "NOTICE_INPUT", inputInfo: name, value: value });
  };

  return (
    <div>
      <div>title:{state.title}</div>
      <div>content:{state.content}</div>
      <div>scope:{state.scope}</div>
      <input
        value={state.title}
        onChange={NoticeInfoOnChange}
        name="id"
        placeholder="id"
      />
      <textarea
        value={state.content}
        onChange={NoticeContentOnChange}
        name="password"
        placeholder="password"
      />
      <input
        value={state.scope}
        onChange={NoticeInfoOnChange}
        name="scope"
        placeholder="scope"
      />
    </div>
  );
};

export default NoticeWrite;
