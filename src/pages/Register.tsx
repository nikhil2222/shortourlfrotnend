import { useState, useEffect } from "react";
import Alert from "@/components/Alert";
import Logo from "@/components/Logo";
import { useSignup } from "@/hooks/useSignUp";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Link as HeroLink,
} from "@heroui/react";
import { isAxiosError } from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  IoMdEye,
  IoMdEyeOff,
  IoMdKey,
  IoMdMail,
  IoMdPerson,
} from "react-icons/io";
import { Link } from "react-router-dom";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  
  const signUp = useSignup();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    signUp.mutate(data);
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 py-12 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-blue-200/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-purple-200/20 via-transparent to-transparent" />
      
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl relative z-10 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl border border-white/50 animate-float-in">
        <CardHeader className="flex justify-center pb-2 pt-8 md:pt-12">
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl backdrop-blur-sm border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
            <Logo className="w-20 h-20 md:w-24 md:h-24" />
          </div>
        </CardHeader>
        
        <Divider className="mx-6 bg-gradient-to-r from-blue-200 to-purple-200 h-px shadow-sm" />
        
        <CardBody className="px-6 md:px-8 pb-4 md:pb-6">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent leading-tight drop-shadow-lg">
              Join Short Your Link
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mt-4 font-medium opacity-90 max-w-sm mx-auto leading-relaxed">
              Create your account in seconds. Start shortening smarter.
            </p>
          </div>

          {signUp.isError && (
            <Alert
              message={
                isAxiosError(signUp.error)
                  ? signUp.error.response?.data?.message ||
                    signUp.error.message ||
                    "Network error occurred"
                  : signUp.error instanceof Error
                  ? signUp.error.message
                  : "An unexpected error occurred during signup."
              }
              type="error"
              className="mb-6 animate-slide-down"
            />
          )}
          
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="group">
              <Input
                type="text"
                label="Username"
                radius="lg"
                labelPlacement="outside"
                startContent={
                  <IoMdPerson className="text-xl md:text-2xl text-blue-500 group-focus-within:text-blue-600 transition-colors duration-300 flex-shrink-0" />
                }
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 5,
                    message: "Username must be at least 5 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username must be less than 20 characters",
                  },
                })}
                isInvalid={!!errors?.username}
                errorMessage={errors?.username?.message as string}
                className="hover:shadow-md focus:shadow-xl transition-all duration-300 h-14 md:h-16"
              />
            </div>

            <div className="group">
              <Input
                type="email"
                label="Email Address"
                radius="lg"
                labelPlacement="outside"
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
                startContent={
                  <IoMdKey className="text-xl md:text-2xl text-purple-500 group-focus-within:text-purple-600 transition-colors duration-300 flex-shrink-0" />
                }
                endContent={
                  <button
                    className="focus:outline-none p-1 hover:bg-white/50 rounded-full transition-all duration-200 hover:scale-110"
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
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must include uppercase, lowercase, number & special char",
                  },
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
              className="mt-4 w-full h-14 md:h-16 font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 group/btn"
              type="submit"
              isLoading={signUp.isPending}
              startContent={
                signUp.isPending ? null : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                  </svg>
                )
              }
            >
              {signUp.isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardBody>
        
        <CardFooter className="px-6 md:px-8 pb-8 md:pb-10 pt-0">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-600 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 shadow-inner">
            <p className="text-center sm:text-left">Already have an account?</p>
            <HeroLink
              as={Link}
              to="/login"
              className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:underline underline-offset-4 text-base px-3 py-1 rounded-lg hover:shadow-md"
            >
              Sign in here
            </HeroLink>
          </div>
        </CardFooter>
      </Card>

      <style jsx>{`
        @keyframes float-in {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float-in {
          animation: float-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </main>
  );
};

export default Register;
