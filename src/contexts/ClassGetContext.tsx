import React, { useReducer, Dispatch, FC, createContext } from "react";
import { classDefaultValue, classReducer } from "./ClassPostContext";

type ClassGetType =
  | "class_code"
  | "user_id"
  | "name"
  | "profile_iamge_url"
  | "walk_count";

type ClassGetAction = {
  type: "CLASS_GET";
  getInfo: ClassGetType;
  value: string | number;
};

type ClassGetDefaultValueType = {
  class_code: string;
  user_list: [
    {
      user_id: number;
      name: string;
      profile_iamge_url: string;
      walk_count: number;
    }
  ];
};

type ClassDispatch = Dispatch<ClassGetAction>;

const ClassGetContextProvider: FC = ({ children }) => {
  const [classGetState, classGetDispatch] = useReducer(
    classGetReducer,
    classGetDefaultValue
  );
  return (
    <classGetStateContext.Provider value={classGetState}>
      <ClassDispatchContext.Provider value={classGetDispatch}>
        {children}
      </ClassDispatchContext.Provider>
    </classGetStateContext.Provider>
  );
};

export const classGetDefaultValue: ClassGetDefaultValueType = {
  class_code: "",
  user_list: [
    {
      user_id: 0,
      name: "",
      profile_iamge_url: "",
      walk_count: 0,
    },
  ],
};

export const classGetStateContext =
  createContext<ClassGetDefaultValueType>(classGetDefaultValue);
export const ClassDispatchContext = createContext<ClassDispatch>(() => null);

export const classGetReducer = (
  state: ClassGetDefaultValueType,
  action: ClassGetAction
): ClassGetDefaultValueType => {
  switch (action.type) {
    case "CLASS_GET":
      return {
        ...state,
        [action.getInfo]: [action.value],
      };
    default:
      return state;
  }
};

export default ClassGetContextProvider;
