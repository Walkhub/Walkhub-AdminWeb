import { ModalsStateContext } from "@src/contexts/ModalContext";
import { useContext } from "react";

const Modals = () => {
  const openedModal = useContext(ModalsStateContext);
  return (
    <>
      {openedModal.map((modal, index) => (
        <modal.Component key={index} {...modal.props}></modal.Component>
      ))}
    </>
  );
};

export default Modals;
