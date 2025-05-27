'use client';
import React from 'react';
import { Home, ArrowLeft, Compass, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* floating decorations */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/5 w-4 h-4 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full opacity-25 animate-pulse delay-500"></div>

        {/* main content */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl p-12">
          {/* 404 number */}
          <div className="relative mb-8">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
          </div>

          {/* compass icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 via-indigo-50 to-blue-100 rounded-3xl flex items-center justify-center shadow-lg border border-blue-200/50">
              <Compass className="w-12 h-12 text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Page Not Found
            </h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
              The requested page is not available. <br />
              Let's get you back to organizing your tasks.
            </p>
          </div>

          {/* action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-blue-200/50 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span>Go Home</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group flex items-center space-x-3 px-8 py-4 bg-white/80 text-gray-700 font-medium rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-white hover:border-gray-300 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Go Back</span>
            </button>
          </div>

        </div>

        <div className="absolute -z-10 top-16 left-16 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-xl"></div>
        <div className="absolute -z-10 bottom-16 right-16 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}