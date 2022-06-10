import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

type ModalsDispatch = {
  open: (Component: (props?: any) => JSX.Element, props?: any) => void;
  close: (Component: (props?: any) => JSX.Element) => void;
};

type OpenedModal = {
  Component: () => JSX.Element;
  props: any;
};

export const ModalsProvider: React.FC = ({ children }) => {
  const [openedModals, setOpenedModals] = useState<OpenedModal[]>([]);
  useEffect(() => {}, [openedModals]);
  const open = (Component: () => JSX.Element, props: any) => {
    setOpenedModals(state => [...state, { Component, props }]);
  };

  const close = (Component: () => JSX.Element) => {
    setOpenedModals(state =>
      state.filter(modal => modal.Component !== Component)
    );
  };

  const dispatch = useMemo(
    () => ({
      open,
      close,
    }),
    []
  );
  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        {children}
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export const ModalsStateContext = createContext<OpenedModal[]>([]);

export const ModalsDispatchContext = createContext<ModalsDispatch>(null);
