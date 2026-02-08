import { useState, useEffect } from "react";
import DetailsCard from "@/components/DetailsCard";
import UrlCard from "@/components/UrlCard";
import { useCreateUrl } from "@/hooks/useCreateUrl";
import { 
  Button, 
  Card, 
  CardBody,  
  CardHeader, 
  Divider, 
  Input, 
  Skeleton,
  Chip 
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { 
  MdLink, 
  MdInfo, 
  MdAutorenew, 
  MdAdd, 
  MdTrendingUp 
} from "react-icons/md";
import { IoLink } from "react-icons/io5";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [urlData, setUrlData] = useState<UrlData | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      redirectUrl: "",
      customAlias: "",
    },
  });
  
  const createUrl = useCreateUrl();
  
  const { data: urls, isPending } = useQuery<Url[]>({
    queryKey: ["urls"],
    queryFn: async () => {
      const { data } = await axios.get("https://shorturlbackend-zzyv.onrender.com/api/link");
      return data;
    },
    refetchInterval: 5000,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    createUrl.mutate(data, {
      onSuccess: ({ data }) => {
        reset();
        setUrlData(data);
        setIsSuccess(true);
        toast.success("URL shortened successfully! ✨");
      },
      onError: () => {
        toast.error("Failed to shorten URL. Try again.");
      },
    });
  };


  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6 lg:p-8 py-12 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-left,_var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-right,_var(--tw-gradient-stops))] from-purple-200/30 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-20">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border border-white/50 mb-6">
            <MdTrendingUp className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
                Dashboard
              </h1>
              <p className="text-lg text-gray-600 mt-1 font-medium">
                {urls?.length || 0} {urls?.length === 1 ? 'link' : 'links'} shortened
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-1 hidden lg:block sticky top-8 self-start">
            <Card className="w-full backdrop-blur-xl bg-white/70 shadow-2xl border border-white/50">
              <CardHeader className="pb-4">
                <h3 className="font-bold text-xl flex items-center gap-2 text-gray-800">
                  <MdAdd className="w-6 h-6 text-green-600" />
                  Quick Stats
                </h3>
              </CardHeader>
              <CardBody className="space-y-4 pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Links</span>
                    <span className="font-bold text-xl text-gray-900">{urls?.length || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-700" 
                      style={{ width: `${Math.min((urls?.length || 0) * 20, 100)}%` }}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="lg:col-span-2 lg:col-start-2">
            <Card className="w-full backdrop-blur-xl bg-white/80 shadow-2xl shadow-blue-500/10 hover:shadow-3xl transition-all duration-500 border border-white/50 group/card">
              <CardHeader className="p-8 text-center">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-6 py-3 rounded-2xl border border-blue-200/50 mb-6">
                  {isSuccess ? (
                    <>
                      <MdInfo className="w-6 h-6 text-green-600" />
                      <span className="font-bold text-xl text-gray-800">Your Short Link Ready!</span>
                    </>
                  ) : (
                    <>
                      <IoLink className="w-7 h-7 text-blue-600" />
                      <span className="font-bold text-xl lg:text-2xl text-gray-800">Shorten Your Link</span>
                    </>
                  )}
                </div>
              </CardHeader>
              
              <Divider className="mx-8 bg-gradient-to-r from-blue-200 to-purple-200" />
              
              {isSuccess ? (
                <DetailsCard 
                  urlData={urlData!} 
                  setIsSuccess={setIsSuccess}
                  
                />
              ) : (
                <CardBody className="px-8 pb-12">
                  <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="group/input relative">
                      <Input
                        type="url"
                        size="lg"
                        variant="bordered"
                        radius="lg"
                        className="h-16 group-focus-within:shadow-xl transition-all duration-300 min-h-[56px]"
                        placeholder="https://super-long-url-needing-shortening.com/very/long/path"
                        startContent={
                          <MdLink className="w-6 h-6 text-blue-500 group-focus-within:text-blue-600 transition-colors flex-shrink-0" />
                        }
                        {...register("redirectUrl", {
                          required: "Enter a URL to shorten",
                          pattern: {
                            value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                            message: "Please enter a valid URL",
                          },
                        })}
                        isInvalid={!!errors?.redirectUrl}
                        errorMessage={errors?.redirectUrl?.message as string}
                      />
                    </div>

                    <div className="group/input relative">
                      <Input
                        type="text"
                        size="lg"
                        variant="bordered"
                        radius="lg"
                        className="h-16 group-focus-within:shadow-xl transition-all duration-300 min-h-[56px]"
                        placeholder="your-custom-link (optional)"
                        startContent={
                          <MdAutorenew className="w-6 h-6 text-purple-500 group-focus-within:text-purple-600 transition-colors flex-shrink-0" />
                        }
                        {...register("customAlias", {
                          maxLength: 20,
                          pattern: {
                            value: /^[a-zA-Z0-9_-]+$/,
                            message: "Only letters, numbers, -, _ allowed",
                          },
                        })}
                        isInvalid={!!errors?.customAlias}
                        errorMessage={errors?.customAlias?.message as string}
                      />
                      <Chip 
                        size="sm" 
                        color="default" 
                        variant="flat"
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
                      >
                        Optional
                      </Chip>
                    </div>

                    <Button
                      color="primary"
                      radius="lg"
                      size="lg"
                      className="w-full h-16 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-xl font-bold group/btn"
                      type="submit"
                      isLoading={createUrl.isPending}
                      startContent={<MdAdd className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />}
                    >
                      {createUrl.isPending ? "Creating..." : "Shorten URL"}
                    </Button>
                  </form>
                </CardBody>
              )}
            </Card>
          </div>

          <div className="lg:col-span-1 hidden xl:block sticky top-8 self-start" />
        </div>

        <div className="mt-20 lg:mt-32">
          <div className="flex items-center justify-between mb-8 lg:mb-12 px-4 sm:px-6">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-black bg-gradient-to-r from-gray-800 to-blue-900 bg-clip-text text-transparent flex items-center gap-3">
              <MdLink className="w-8 h-8" />
              Recent Links
            </h2>
            <Chip 
              color="primary" 
              variant="flat" 
              size="lg"
              className="font-semibold shadow-lg"
            >
              {urls?.length || 0}
            </Chip>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {isPending ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton 
                  key={i} 
                  className="h-32 md:h-36 rounded-2xl shadow-xl" 
                />
              ))
            ) : urls?.length ? (
              urls.map((url) => (
                <UrlCard key={url._id} url={url} />
              ))
            ) : (
              <div className="md:col-span-2 xl:col-span-3 text-center py-20">
                <MdLink className="w-24 h-24 text-gray-300 mx-auto mb-6 opacity-50" />
                <h3 className="text-2xl font-bold text-gray-500 mb-2">No links yet</h3>
                <p className="text-gray-400 text-lg">Shorten your first URL above!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style >{`
        .group\/input {
          position: relative;
        }
      `}</style>
    </main>
  );
};

export default Dashboard;
