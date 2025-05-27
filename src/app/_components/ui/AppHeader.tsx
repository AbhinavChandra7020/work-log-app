import React from 'react';
import Image from 'next/image';

const AppHeader = () => {
  return (
    <div className="text-center space-y-4">
      {/* upper row content*/}
      <div className="flex justify-center items-center gap-4">
        <div className="relative">
          <Image
            src="/WorkLog.png"
            alt="WorkLog Logo"
            width={64}
            height={64}
            className="object-contain drop-shadow-lg"
            priority
          />
          {/* logo glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl -z-10 scale-150"></div>
        </div>
        
        <div className="flex flex-col items-start">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-950 via-green-700 to-green-400 bg-clip-text text-transparent leading-tight">
            Work Log
          </h1>
          {/* underline decoration */}
          <div className="w-full h-1 bg-gradient-to-r from-green-500 via-green-200 to-green-500 rounded-full mt-1 opacity-30"></div>
        </div>
      </div>
      
      {/* subtitle */}
      <p className="text-green-900 text-lg font-medium max-w-md mx-auto">
        Organize your resources and track your progress with style
      </p>
      
      {/* decorations */}
      <div className="flex justify-center items-center space-x-2 opacity-40">
        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
        <div className="w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse delay-300"></div>
        <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-pulse delay-700"></div>
      </div>
    </div>
  );
};

export default AppHeader;