import { toast } from "sonner";

const useToast = () => {
  // Function to determine position based on screen width
  const getPosition = () =>
    window.innerWidth < 768 ? "top-right" : "bottom-right";

  const show = (message: string) => {
    toast(message, { position: getPosition() });
  };

  const showSuccess = (message: string) => {
    toast.success(message, { position: getPosition() });
  };

  const showError = (message: string) => {
    toast.error(message, { position: getPosition() });
  };

  const toaster = {
    show,
    success: showSuccess,
    error: showError,
  };

  return {
    toaster,
  };
};

export default useToast;
