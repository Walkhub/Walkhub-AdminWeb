import { toast } from "react-toastify";

export default function ToastSuccess(text: string | null) {
  toast.success(`${text}`, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
