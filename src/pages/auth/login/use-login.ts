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
      // Login request
      const response = await apiRequest("Login/login", "POST", "", loginData);
      if (response.error) {
        toaster.error(response.error);
        throw new Error(response.error);
      }

      toaster.success("Login successful...");
      setLoggedInUser(response.data, response.data.token);

      // Fetch user countries
      const countriesResponse = await apiRequest(
        "Login/usercountries",
        "GET",
        response.data.token
      );
      if (countriesResponse.error) {
        toaster.error(countriesResponse.error);
        throw new Error(countriesResponse.error);
      }

      // Fetch user sites
      const siteResponse = await apiRequest(
        `Login/usersites?countryId=${countriesResponse.data[0].countryId}`,
        "GET",
        response.data.token
      );
      if (siteResponse.error) {
        toaster.error(siteResponse.error);
        throw new Error(siteResponse.error);
      }

      // Navigate to dashboard on success
      navigate(routes.dashboard.index);
    } catch (error) {
      // General error handling
      toaster.error("An error occurred. Please try again.");
      console.error("Error during login flow: ", error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset
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
