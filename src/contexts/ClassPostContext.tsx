import React, { useReducer, Dispatch, FC, createContext } from "react";

type ClassPostType = "grade" | "class";

type ClassPostAction = {
  type: "CLASS_POST_INPUT";
  inputInfo: ClassPostType;
  value: number;
};

type ClassPostDefaultValueType = Record<ClassPostType, number>;

type ClassDispatch = Dispatch<ClassPostAction>;

const ClassPostContextProvider: FC = ({ children }) => {
  const [classState, classDispatch] = useReducer(
    classReducer,
    classDefaultValue
  );
  return (
    <ClassStateContext.Provider value={classState}>
      <ClassDispatchContext.Provider value={classDispatch}>
        {children}
      </ClassDispatchContext.Provider>
    </ClassStateContext.Provider>
  );
};

export const classDefaultValue: ClassPostDefaultValueType = {
  grade: 0,
  class: 0,
};

export const ClassStateContext =
  createContext<ClassPostDefaultValueType>(classDefaultValue);
export const ClassDispatchContext = createContext<ClassDispatch>(() => null);

export const classReducer = (
  state: ClassPostDefaultValueType,
  action: ClassPostAction
): ClassPostDefaultValueType => {
  switch (action.type) {
    case "CLASS_POST_INPUT":
      return {
        ...state,
        [action.inputInfo]: [action.value],
      };
    default:
      return state;
  }
};

export default ClassPostContextProvider;
