import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export const useSignup = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (data: FieldValues) => {
      const response = await axios.post(
        "https://shorturlbackend-zzyv.onrender.com/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    },
    onSuccess: ({ data: { token } }) => {
      toast.success("Registration Successful!");
      const { email, username }: DecodedToken = jwtDecode(token);
      login(token, email, username);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message || "Registration failed";
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};

