// components/WebsitePreview.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { ExternalLink, Globe, AlertCircle, Loader2 } from 'lucide-react';

interface WebsitePreviewProps {
  url: string;
}

interface WebsiteData {
  title?: string;
  description?: string;
  logo?: string;
  image?: string;
  publisher?: string;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data.status === 'success') {
          setWebsiteData({
            title: data.data.title,
            description: data.data.description,
            logo: data.data.logo?.url,
            image: data.data.image?.url,
            publisher: data.data.publisher
          });
          setHasError(false);
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.error('Error fetching website data:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebsiteData();
  }, [url]);

  const openUrl = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-[200px] w-full flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
          <p className="text-sm text-gray-600 font-medium">Loading preview...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError || !websiteData) {
    return (
      <div 
        className="relative group bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-[200px] w-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50"
        onClick={openUrl}
      >
        <div className="text-center space-y-3">
          <div className="relative">
            <AlertCircle className="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
            <Globe className="w-6 h-6 text-gray-300 absolute -bottom-1 -right-1 group-hover:text-blue-400 transition-colors duration-300" />
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600 group-hover:text-blue-700 transition-colors duration-300">
              Preview unavailable
            </p>
            <p className="text-xs text-gray-500 px-4 truncate max-w-[280px]">
              {getDomain(url)}
            </p>
          </div>
        </div>
        
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full border border-blue-200 shadow-sm">
            <ExternalLink className="w-3 h-3 text-blue-600" />
            <span className="text-xs text-blue-700 font-medium">Open</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative group bg-white border border-gray-200 rounded-xl h-[200px] w-full cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-blue-300 overflow-hidden"
      onClick={openUrl}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full">
        {/* Logo Section - Left Side */}
        <div className="w-24 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border-r border-gray-200 flex-shrink-0">
          {websiteData.logo && !logoError ? (
            <img 
              src={websiteData.logo} 
              alt={`${websiteData.publisher || getDomain(url)} logo`}
              className="w-12 h-12 object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
          )}
        </div>

        {/* Content Section - Right Side */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight">
              {websiteData.title || 'Website Preview'}
            </h3>
            
            {websiteData.description && (
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {websiteData.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-gray-500 truncate">
              {websiteData.publisher || getDomain(url)}
            </span>
            
            {/* External link icon */}
            <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0 ml-2" />
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-blue-600/5 transition-all duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-white/95 px-3 py-1.5 rounded-full border border-blue-200 shadow-md">
            <ExternalLink className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700 font-medium">Open</span>
          </div>
        </div>
      </div>

      {/* Background image overlay (subtle) */}
      {websiteData.image && (
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${websiteData.image})` }}
        />
      )}
    </div>
  );
};

export default WebsitePreview;