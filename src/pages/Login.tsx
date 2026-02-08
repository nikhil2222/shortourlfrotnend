import { useState } from "react";
import Alert from "@/components/Alert";
import Logo from "@/components/Logo";
import { useLogin } from "@/hooks/useLogin";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import { isAxiosError } from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff, IoMdKey, IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const login = useLogin();

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    login.mutate(data, {
      onSuccess: () => {
        toast.success("Welcome back!");
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Invalid credentials");
        } else {
          toast.error("Login failed. Please try again.");
        }
      },
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 py-12 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-blue-200/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-purple-200/20 via-transparent to-transparent" />
      
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl relative z-10 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl border border-white/50 hover:shadow-3xl transition-all duration-500">
        <CardHeader className="flex justify-center pb-2 pt-8 md:pt-12">
          <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl backdrop-blur-sm border border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <Logo className="w-20 h-20 md:w-24 md:h-24" />
          </div>
        </CardHeader>
        
        <Divider className="mx-8 bg-gradient-to-r from-blue-200 to-purple-200 h-px shadow-sm" />
        
        <CardBody className="px-8 md:px-12 pb-8 md:pb-10">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-4 drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium opacity-90">
              Sign in to your Tinylink account
            </p>
          </div>

          {login.isError && (
            <Alert
              message={
                isAxiosError(login.error)
                  ? login.error.response?.data?.message ||
                    login.error.message ||
                    "Network error occurred"
                  : login.error instanceof Error
                  ? login.error.message
                  : "An unexpected error occurred during login."
              }
              type="error"
              className="mb-8 animate-pulse"
            />
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="group">
              <Input
                type="email"
                label="Email Address"
                radius="lg"
                labelPlacement="outside"
                autoComplete="email"
                startContent={
                  <IoMdMail className="text-xl md:text-2xl text-emerald-500 group-focus-within:text-emerald-600 transition-colors duration-300 flex-shrink-0" />
                }
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Please enter a valid email address",
                  },
                })}
                isInvalid={!!errors?.email}
                errorMessage={errors?.email?.message as string}
                className="hover:shadow-md focus:shadow-xl transition-all duration-300 h-14 md:h-16"
              />
            </div>

            <div className="group relative">
              <Input
                label="Password"
                radius="lg"
                labelPlacement="outside"
                autoComplete="current-password"
                startContent={
                  <IoMdKey className="text-xl md:text-2xl text-purple-500 group-focus-within:text-purple-600 transition-colors duration-300 flex-shrink-0" />
                }
                endContent={
                  <button
                    className="p-2 hover:bg-white/50 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <IoMdEyeOff className="text-xl md:text-2xl text-gray-500" />
                    ) : (
                      <IoMdEye className="text-xl md:text-2xl text-gray-500" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                isInvalid={!!errors?.password}
                errorMessage={errors?.password?.message as string}
                className="hover:shadow-md focus:shadow-xl transition-all duration-300 h-14 md:h-16 pr-14"
              />
            </div>

            <Button
              color="primary"
              radius="lg"
              size="lg"
              className="w-full h-14 md:h-16 font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 group/btn"
              type="submit"
              isLoading={login?.isPending}
              startContent={
                login.isPending ? null : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                )
              }
            >
              {login?.isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardBody>
        
        <CardFooter className="px-8 md:px-12 pb-10 md:pb-12 pt-0">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-600 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-inner w-full">
            <p className="text-center sm:text-left">New to Tinylink?</p>
            <Link
              className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:underline underline-offset-4 text-base px-4 py-2 rounded-lg hover:shadow-md"
              to="/register"
            >
              Create Account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Login;
