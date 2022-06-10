import { ModalsDispatchContext } from "@src/contexts/ModalContext";
import { useContext } from "react";

const useModal = (component: () => JSX.Element, props: any) => {
  const { open, close } = useContext(ModalsDispatchContext);

  const openModal = () => {
    open(component, props);
  };
  const closeModal = () => {
    close(component);
  };

  return {
    openModal,
    closeModal,
  };
};

export default useModal;
