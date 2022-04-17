import { createContext, Dispatch, useCallback, useReducer } from "react";
import {
  participantSortType,
  participantsScopeType,
} from "@src/components/common/search/options";

interface ParticipantsOptionStateType {
  sort: participantSortType;
  userScope: participantsScopeType;
  page: number;
  grade: number;
  classNum: number;
  name: string;
}

type ChangeOptionAction = {
  type: "CHANGE_OPTION";
  dropdownName: "sort" | "userScope" | "grade" | "classNum";
  value: participantSortType | participantsScopeType | number;
};
type ChangePageAction = {
  type: "CHANGE_PAGE";
  changePageValue: number;
};

type ChangeInputAction = {
  type: "CHANGE_INPUT";
  value: string;
};

type ActionTypes = ChangeOptionAction | ChangePageAction | ChangeInputAction;

type ChangeOptionDispatch = Dispatch<ActionTypes>;

const ParticipantOptionProvider: React.FC = ({ children }) => {
  const [participantOptionState, changeOptionDispatch] = useReducer(
    participantReducer,
    participantDefaultValue
  );
  return (
    <ParticipantStateContext.Provider value={participantOptionState}>
      <ParticipantDispatchContext.Provider value={changeOptionDispatch}>
        {children}
      </ParticipantDispatchContext.Provider>
    </ParticipantStateContext.Provider>
  );
};
export const participantDefaultValue: ParticipantsOptionStateType = {
  sort: "USER_NAME",
  userScope: "ALL",
  page: 1,
  grade: null,
  classNum: null,
  name: "",
};

export const ParticipantStateContext =
  createContext<ParticipantsOptionStateType>(participantDefaultValue);

export const ParticipantDispatchContext = createContext<ChangeOptionDispatch>(
  () => null
);

export const participantReducer = (
  state: ParticipantsOptionStateType,
  action: ActionTypes
): ParticipantsOptionStateType => {
  switch (action.type) {
    case "CHANGE_OPTION":
      return {
        ...state,
        [action.dropdownName]: action.value,
      };
    case "CHANGE_PAGE":
      return {
        ...state,
        page: action.changePageValue,
      };
    case "CHANGE_INPUT":
      return {
        ...state,
        name: action.value,
      };
    default:
      return state;
  }
};
export default ParticipantOptionProvider;
