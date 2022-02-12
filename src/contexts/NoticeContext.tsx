import { useReducer, Dispatch, FC, createContext, Children } from "react";

type NoticePostType = "title" | "content" | "scope";

type NoticePostDefaultValueType = Record<NoticePostType, string>;

type NoticeAction = {
  type: "NOTICE_INPUT";
  inputInfo: NoticePostType;
  value: string;
};

type NoticeDispatch = Dispatch<NoticeAction>;

const NoticeContextProvider: FC = ({ children }) => {
  const [noticeState, noticeDispatch] = useReducer(
    noticeReducer,
    noticeDefaultValue
  );
  return (
    <NoticeStateContext.Provider value={noticeState}>
      <NoticeDispatchContext.Provider value={noticeDispatch}>
        {children}
      </NoticeDispatchContext.Provider>
    </NoticeStateContext.Provider>
  );
};

export const noticeDefaultValue: NoticePostDefaultValueType = {
  title: "",
  content: "",
  scope: "",
};

export const NoticeStateContext =
  createContext<NoticePostDefaultValueType>(noticeDefaultValue);
export const NoticeDispatchContext = createContext<NoticeDispatch>(() => null);

export const noticeReducer = (
  state: NoticePostDefaultValueType,
  action: NoticeAction
): NoticePostDefaultValueType => {
  switch (action.type) {
    case "NOTICE_INPUT":
      return {
        ...state,
        [action.inputInfo]: [action.value],
      };
    default:
      return state;
  }
};

export default NoticeContextProvider;
