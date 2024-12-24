import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useToast from "@/hooks/use-toast";
import routes from "@/services/routes";
import { useAuthContext } from "@/states/auth";
import { useLayoutContext } from "@/states/layout";
import apiRequest from "@/services/api/api";

const useLogin = () => {
  const navigate = useNavigate();

  const { toaster } = useToast();
  const { setLoggedInUser } = useAuthContext();
  const { changeCompany, changeSite } = useLayoutContext();

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
      const response: any = await apiRequest(
        "Login/login",
        "POST",
        "",
        loginData
      );
      toaster.success("Login successful...");
      console.log("Login response:", response);

      // Fetch user countries
      const countriesResponse: any = await apiRequest(
        "Login/usercountries",
        "GET",
        response.token
      );
      console.log("Countries response:", countriesResponse);

      // Fetch user sites
      const siteResponse: any = await apiRequest(
        `Login/usersites?companyId=${countriesResponse[0].companyId}`,
        "GET",
        response.token
      );
      console.log("Site response:", siteResponse);

      // Success logic
      setLoggedInUser(
        response,
        response.token,
        countriesResponse,
        siteResponse
      );
      changeSite(response.siteId);
      changeCompany(response.companyId);

      // Navigate to dashboard
      navigate(routes.dashboard.index);
    } catch (error) {
      // General error handling
      toaster.error("An error occurred. Please try again.");
      console.error("Error during login flow:", error);
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
