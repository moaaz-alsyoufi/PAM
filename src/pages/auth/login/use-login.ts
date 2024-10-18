import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useToast from "@/hooks/use-toast";
import routes from "@/services/routes";
import { useAuthContext } from "@/states/auth";
import { ACTIVE_API_URL } from "@/services/api/api";
import axios from "axios";

const useLogin = () => {
  const navigate = useNavigate();

  const { toaster } = useToast();
  const { setLoggedInUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  type LoginSchemaType = z.infer<typeof loginSchema>;

  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const loginDate = {
      email: data.username,
      password: data.password,
    };

    try {
      const response = await axios.post(`${ACTIVE_API_URL}login`, loginDate);

      toaster.success("Login successful...");
      setLoggedInUser(response.data.token);

      console.log(response.data.token);

      setIsLoading(false);
      navigate(routes.dashboards.ecommerce);
    } catch (error: any) {
      console.log("error: ", error);

      if (error.response) {
        console.log("error.response: ", error.response);
        toaster.error(`${error.response.data}`);
        setIsLoading(false);
        throw new Error(error.response.data);
      } else {
        toaster.error("An error occurred. Please try again.");
        setIsLoading(false);
        throw new Error("An error occurred while logging in.");
      }
    }
  });

  return {
    showPassword,
    isLoading,
    control,
    onSubmit,
    toggleShowPassword,
  };
};

export default useLogin;
