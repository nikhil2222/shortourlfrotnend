import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useErrorHandler } from "./useErrorHandler";
import { FieldValues } from "react-hook-form";

export const useUpdateUrl = () => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FieldValues) => {
      const updatePromise = axios.put(`http://localhost:8080/api/link/${data._id}`, data);
      toast.promise(
        updatePromise,
        {
          loading: "Updating URL...",
          success: "URL updated successfully!",
          error: "Failed to update URL.",
        },
        { id: `update-url-${data?._id}` }
      );
      return updatePromise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
};
