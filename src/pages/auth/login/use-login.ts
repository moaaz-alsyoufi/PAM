import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useToast from "@/hooks/use-toast";
import routes from "@/services/routes";
import { useAuthContext } from "@/states/auth";
import { apiRequest } from "@/services/api/request";

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

    const loginData = {
      email: data.username,
      password: data.password,
    };

    try {
      const response = await apiRequest(
        "Login/login", // Endpoint
        "POST", // HTTP method
        "", // No token needed for login
        loginData // Data payload
      );

      if (response.error) {
        // Handle error from API response
        toaster.error(response.error);
        setIsLoading(false);
        throw new Error(response.error);
      }

      // Successful login
      toaster.success("Login successful...");
      setLoggedInUser(response.data.token, response.data.token); // Set the logged-in user
      setIsLoading(false);
      navigate(routes.dashboard.index); // Redirect to dashboard
    } catch (error) {
      // Handle unexpected errors
      toaster.error("An error occurred. Please try again.");
      setIsLoading(false);
      console.error("Unexpected error: ", error);
      throw new Error("An unexpected error occurred while logging in.");
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
