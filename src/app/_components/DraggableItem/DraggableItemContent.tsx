'use client';
import React, { useEffect, useState } from 'react';
import { getUrlType, getYouTubeId } from '../../_utils/urlUtils';
import Modal from '../ui/Modal';
import { getBlobUrlFromIndexedDB } from '../../_utils/indexedDbUtils';
import WebsitePreview from '../ui/WebsitePreview';

interface Props {
  content: string;
  compact: boolean;
}

const DraggableItemContent: React.FC<Props> = ({ content, compact }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (content.startsWith('__blob__')) {
      const id = parseFloat(content.replace('__blob__', ''));
      getBlobUrlFromIndexedDB(id).then((url) => {
        if (url) setImageUrl(url);
      });
    }
  }, [content]);

  const isBlobReference = content.startsWith('__blob__');
  const type = isBlobReference ? null : getUrlType(content);
  const videoId = type === 'youtube' ? getYouTubeId(content) : null;

  // blob-based image preview
  if (isBlobReference && imageUrl && !compact) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Uploaded content"
          className="rounded-xl object-contain w-full h-[200px] shadow cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Full preview" className="w-full rounded-lg" />
        </Modal>
      </>
    );
  }

  // YouTube embed
  if (type === 'youtube' && !compact && videoId) {
    return (
      <div className="rounded-xl overflow-hidden shadow-inner mb-3 aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  // external link preview
  if (type === 'url' && !compact) {
    return <WebsitePreview url={content} />;
  }

  // plain text fallback
  return (
    <>
      <div
        className="relative bg-white border border-gray-200 rounded-xl p-4 h-[200px] overflow-hidden group"
        title="Click to view full text"
        onClick={() => setShowModal(true)}
      >
        <p className="text-gray-700 text-sm whitespace-pre-line line-clamp-[8]">
          {content}
        </p>

        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent" />

        <div className="absolute bottom-2 right-3 hidden group-hover:flex">
          <span className="text-xs text-blue-600 bg-white px-2 py-1 rounded-md border hover:bg-blue-50 cursor-pointer">
            View More
          </span>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Full Text">
        {content}
      </Modal>
    </>
  );
};

export default DraggableItemContent;
