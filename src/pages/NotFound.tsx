import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { 
  MdLink, 
  MdHome, 
  MdError 
} from "react-icons/md";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.3),_transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.3),_transparent_50%),radial-gradient(circle_at_40%_40%,_rgba(120,219,255,0.3),_transparent_50%)]" />
      
      <div className="relative z-10 max-w-4xl w-full text-center backdrop-blur-xl bg-white/80 shadow-2xl rounded-3xl border border-white/50 max-h-[90vh] overflow-hidden group">
        <div className="p-12 lg:p-20">
          <div className="inline-flex items-center gap-4 bg-gradient-to-br from-rose-100 to-pink-100 p-6 rounded-3xl border-4 border-rose-200/50 shadow-2xl mb-12 backdrop-blur-sm">
            <MdError className="w-20 h-20 text-rose-600 shadow-lg" />
            <div>
              <div className="w-24 h-24 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 rounded-full -mx-2 -my-2 rotate-12 group-hover:rotate-6 transition-transform duration-700 blur-sm absolute inset-0 opacity-30" />
              <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-br from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent leading-none tracking-tight drop-shadow-2xl">
                404
              </h1>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight">
                Page Not Found
              </h2>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-md mx-auto leading-relaxed">
                The link you followed may be broken, or the page has been removed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-200/50">
              <Button
                as={Link}
                to="/dashboard"
                color="primary"
                size="lg"
                radius="lg"
                className="shadow-xl hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg px-8 py-7 min-w-[160px] group/btn"
                startContent={<MdHome className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />}
              >
                Go to Dashboard
              </Button>
              <Button
                as={Link}
                to="/"
                color="default"
                variant="bordered"
                size="lg"
                radius="lg"
                className="shadow-lg hover:shadow-xl border-2 hover:border-gray-300 font-semibold text-lg px-8 py-7 min-w-[140px]"
              >
                <MdLink className="w-5 h-5 mr-2" />
                Shorten Link
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
      </div>
    </main>
  );
};

export default NotFound;
