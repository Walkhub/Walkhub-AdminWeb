import { toast } from "react-toastify";

export default function ToastError(text: string | null) {
  toast.error(`${text}`, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
