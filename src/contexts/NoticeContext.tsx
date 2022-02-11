import { useReducer, Dispatch, FC, createContext, Children } from "react";

interface NoticePostType {
  title: string;
  content: string;
  scope: string;
}

type NoticeAction = {
  type: "POSTNOTICE";
  inputInfo: "title" | "content" | "scope";
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

export const noticeDefaultValue: NoticePostType = {
  title: "",
  content: "",
  scope: "",
};

export const NoticeStateContext =
  createContext<NoticePostType>(noticeDefaultValue);
export const NoticeDispatchContext = createContext<NoticeDispatch>(() => null);

export const noticeReducer = (
  state: NoticePostType,
  action: NoticeAction
): NoticePostType => {
  switch (action.type) {
    case "POSTNOTICE":
      return {
        ...state,
        [action.inputInfo]: [action.value],
      };
    default:
      return state;
  }
};

export default NoticeContextProvider;
