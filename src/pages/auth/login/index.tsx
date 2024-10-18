import { useState } from "react";
import eyeIcon from "@iconify/icons-lucide/eye";
import eyeOffIcon from "@iconify/icons-lucide/eye-off";
import keyRoundIcon from "@iconify/icons-lucide/key-round";
import logInIcon from "@iconify/icons-lucide/log-in";
import userIcon from "@iconify/icons-lucide/user-2";
import { Link } from "react-router-dom";
import { Button, Checkbox } from "@/components/daisyui";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import PageMetaData from "@/components/PageMetaData";
import FormInput from "@/components/forms/FormInput";
import routes from "@/services/routes";
import ThemeToggle from "../components/ThemeToggle";
import useLogin from "./use-login";

const LoginPage = () => {
  const { isLoading, control, onSubmit, showPassword, toggleShowPassword } =
    useLogin();
  const [isTermsAgreed, setIsTermsAgreed] = useState<boolean>(false);

  return (
    <>
      <PageMetaData title={"Login"} />
      <div className="flex flex-col w-full items-stretch py-16 px-8 lg:p-16 space-y-12">
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
        <div className="text-center space-y-3">
          <h3 className="text-3xl font-semibold">Login</h3>
          <h3 className="text-lg text-base-content/70">
            Seamless Access : Your Gateway to your Portal!.
          </h3>
        </div>
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="form-control ">
              <label className="label ">
                <span className="label-text text-base">Username</span>
              </label>
              <FormInput
                size="md"
                startIcon={
                  <Icon
                    icon={userIcon}
                    className="text-base-content/80"
                    fontSize={18}
                  />
                }
                control={control}
                name={"username"}
                className="w-full focus:border-transparent focus:outline-0"
                bordered={false}
                borderOffset={false}
              ></FormInput>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-base">Password</span>
              </label>
              <FormInput
                size="md"
                startIcon={
                  <Icon
                    icon={keyRoundIcon}
                    className="text-base-content/80 form-control"
                    fontSize={18}
                  />
                }
                control={control}
                name={"password"}
                type={showPassword ? "text" : "password"}
                className="w-full focus:border-transparent focus:outline-0"
                bordered={false}
                endIcon={
                  <Button
                    onClick={toggleShowPassword}
                    size={"xs"}
                    shape={"circle"}
                    color={"ghost"}
                    className={"hover:bg-base-content/10"}
                  >
                    {showPassword ? (
                      <Icon
                        icon={eyeOffIcon}
                        className="text-base-content/80"
                        fontSize={18}
                      />
                    ) : (
                      <Icon
                        icon={eyeIcon}
                        className="text-base-content/80"
                        fontSize={16}
                      />
                    )}
                  </Button>
                }
                borderOffset={false}
              ></FormInput>

              <label className="label">
                <span className="label-text"></span>
                <Link
                  className="label-text text-sm text-base-content/80"
                  to={routes.auth.forgotPassword}
                >
                  Forgot Password?
                </Link>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                size="sm"
                color="primary"
                onChange={() => setIsTermsAgreed(!isTermsAgreed)}
              />
              <label className="text-lg">
                I agree with{" "}
                <span className="cursor-pointer text-primary underline">
                  terms and conditions
                </span>
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <Button
              color="primary"
              loading={isLoading}
              onClick={onSubmit}
              className="gap-3 text-base"
              fullWidth
              startIcon={<Icon icon={logInIcon} fontSize={16} />}
              disabled={!isTermsAgreed || isLoading}
            >
              Login
            </Button>
            <p className="text-center text-base-content/80">
              Haven&apos;t account{" "}
              <Link
                className="text-primary  hover:underline"
                to={routes.auth.register}
              >
                Create One
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
