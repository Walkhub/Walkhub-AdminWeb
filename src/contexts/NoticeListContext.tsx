import fetcher from "@src/utils/function/fetcher";
import React, { FC, useMemo } from "react";
import useSWR from "swr";

interface NoticeStateType {
  id: number;
  title: string;
  content: string;
  created_at: string;
  writer: {
    id: number;
    name: string;
    profile_image_url: string;
  };
}

const NoticeListDefaultState: NoticeStateType[] = [
  {
    id: -1,
    title: "",
    content: "",
    created_at: "",
    writer: {
      id: -1,
      name: "",
      profile_image_url: "",
    },
  },
];

export const NoticeListStateContext = React.createContext<NoticeStateType[]>(
  NoticeListDefaultState
);

const NoticeListContextProvider: FC = ({ children }) => {
  const { data } = useSWR(`/api/notice?scope=ALL`, fetcher);

  const value = useMemo(() => ({ ...data }), [data]);
  return (
    <NoticeListStateContext.Provider value={value}>
      {children}
    </NoticeListStateContext.Provider>
  );
};

export default NoticeListContextProvider;
