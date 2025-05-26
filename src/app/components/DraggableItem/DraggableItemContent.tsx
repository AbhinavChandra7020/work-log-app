import React, { useState } from 'react';
import { getUrlType, getYouTubeId } from '../../utils/urlUtils';
import Modal from '../Modal'; // ✅ import the Modal
import { X } from 'lucide-react';

interface Props {
  content: string;
  compact: boolean;
}

const DraggableItemContent: React.FC<Props> = ({ content, compact }) => {
  const [showModal, setShowModal] = useState(false);

  const type = getUrlType(content);
  const videoId = type === 'youtube' ? getYouTubeId(content) : null;

  // 👉 YOUTUBE EMBED
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

  // 👉 EXTERNAL LINK
  if (type === 'url' && !compact) {
    const parsedUrl = new URL(content);
    const domain = parsedUrl.hostname;
    const pathPreview = parsedUrl.pathname.length > 1 ? parsedUrl.pathname : parsedUrl.href;

    return (
      <a
        href={content}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-blue-50 hover:bg-blue-100 rounded-md transition-all duration-200 h-[200px] p-4"
      >
        <div className="flex flex-col justify-center h-full">
          <div className="text-sm font-semibold text-blue-800 truncate">{domain}</div>
          <div className="text-xs text-gray-700 break-words mt-1 line-clamp-2">{pathPreview}</div>
        </div>
      </a>
    );
  }

  // 👉 PLAIN TEXT BOX
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

        {/* Fade */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent" />

        {/* Hover overlay */}
        <div className="absolute bottom-2 right-3 hidden group-hover:flex">
          <span className="text-xs text-blue-600 bg-white px-2 py-1 rounded-md border hover:bg-blue-50 cursor-pointer">
            View More
          </span>
        </div>
      </div>

      {/* 👉 Use Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Full Text">
        <p className="text-sm text-black leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </Modal>
    </>
  );
};

export default DraggableItemContent;