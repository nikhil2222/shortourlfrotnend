import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroImage from "@/assets/HeroImage.webp";
import { Button, Link } from "@heroui/react";
import { Image } from "@heroui/react";

const Root = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen lg:h-[100dvh] bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      <div className={`relative flex flex-col items-center justify-center h-[calc(100dvh-73px)] lg:h-[calc(100dvh-73px)] max-w-7xl px-4 mx-auto md:flex-row md:px-8 lg:px-12 py-12 lg:py-24 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left py-8 md:py-12 lg:py-16 md:pr-12 lg:pr-20 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-6 md:mb-8 drop-shadow-lg">
            Transform Your Long Links into
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x">Tiny, Powerful Connections!</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl text-gray-600 max-w-lg md:max-w-xl mb-8 md:mb-10 leading-relaxed opacity-90">
  Shorten URLs instantly. Share effortlessly. Track every click. 
  Short Your Link powers your links with smart analytics and custom branding.
</p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md md:max-w-none animate-slide-up-delay">
            <Button
              size="lg"
              color="primary"
              radius="sm"
              href="register"
              as={Link}
              className="group hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-semibold px-8 py-4"
            >
              <span className="flex items-center gap-2">
                Get Started
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
            <Button
              size="lg"
              color="default"
              variant="ghost"
              radius="sm"
              className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 group transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 px-8 py-4 text-lg font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end py-8 md:py-12 lg:py-16 md:pl-12 lg:pl-20 animate-fade-in-right mt-12 md:mt-0">
          <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl p-4 md:p-6 lg:p-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 group/image">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl -z-10 animate-pulse-slow" />
            <Image 
              src={HeroImage} 
              alt="Short Your Link Hero - Shorten, share, and track your links effortlessly" 
              width="full" 
              className="w-full h-auto rounded-2xl shadow-2xl group-hover/image:scale-105 transition-transform duration-700 object-cover"
            />
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-0 group-hover/image:opacity-20 rounded-3xl blur-xl transition-opacity duration-600 animate-gradient-rotate" />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-rotate {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-up-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.9s ease-out 0.2s both;
        }
        .animate-slide-up-delay {
          animation: slide-up-delay 0.8s ease-out 0.4s both;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-gradient-rotate {
          animation: gradient-rotate 4s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Root;
