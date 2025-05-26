// components/WebsitePreview.tsx
'use client';
import React from 'react';
import Microlink from '@microlink/react';

interface WebsitePreviewProps {
  url: string;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ url }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-md h-[200px] w-full">
      <Microlink
        url={url}
        size="large"
        media="logo"
        theme="light"
        className="w-full h-full"
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default WebsitePreview;
