import { createContext, Dispatch, useReducer } from "react";
import {
  participantOrderType,
  participantsScopeType,
  successScopeType,
} from "@src/components/challengeDetail/search";

interface ParticipantsOptionStateType {
  participantOrder: participantOrderType;
  participantsScope: participantsScopeType;
  successScope: successScopeType;
  page: number;
}

type ChangeOptionAction = {
  type: "CHANGE_OPTION";
  dropdownName: "participantOrder" | "participantsScope" | "successScope";
  value: participantOrderType | participantsScopeType | successScopeType;
};
type ChangePageAction = {
  type: "CHANGE_PAGE";
  changePageValue: number;
};

type ChangeOptionDispatch = Dispatch<ChangeOptionAction | ChangePageAction>;

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
  participantOrder: "USER_NAME",
  participantsScope: "ALL",
  successScope: "ALL",
  page: 1,
};

export const ParticipantStateContext =
  createContext<ParticipantsOptionStateType>(participantDefaultValue);

export const ParticipantDispatchContext = createContext<ChangeOptionDispatch>(
  () => null
);

export const participantReducer = (
  state: ParticipantsOptionStateType,
  action: ChangeOptionAction | ChangePageAction
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
        ["page"]: action.changePageValue,
      };
    default:
      return state;
  }
};
export default ParticipantOptionProvider;
