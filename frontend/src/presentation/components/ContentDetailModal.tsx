'use client';

import { useState, useRef, useEffect } from 'react';

interface MovieContent {
  id: number;
  title: string;
  original_title?: string;
  backdrop_path?: string;
  trailer?: {
    key: string;
  };
  overview?: string;
  release_date?: string;
  vote_average?: number;
  runtime?: number;
  genres?: Array<{ id: number; name: string }>;
  production_companies?: Array<{ id: number; name: string }>;
}

interface ContentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: MovieContent | null;
  isLoading?: boolean;
}

export const ContentDetailModal: React.FC<ContentDetailModalProps> = ({
  isOpen,
  onClose,
  content,
  isLoading = false
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(true);
    }
  }, [isOpen]);

  const handlePlayPause = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeWindow = iframe.contentWindow;

      if (iframeWindow) {
        // Send postMessage to control YouTube iframe
        iframeWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: isPlaying ? 'pauseVideo' : 'playVideo',
            args: []
          }),
          '*'
        );
        setIsPlaying(!isPlaying);
      }
    }
  };

  if (!isOpen) return null;

  if (isLoading || !content) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/80" onClick={onClose} />
        <div className="relative bg-black rounded-lg p-8 text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  const backdropUrl = content.backdrop_path
    ? (localStorage.getItem('imageUrl') || 'https://image.tmdb.org/t/p/') + 'original' + content.backdrop_path
    : null;

  console.log('Modal content:', {
    hasTrailer: !!content.trailer?.key,
    hasBackdrop: !!content.backdrop_path,
    backdropUrl,
    imageUrl: localStorage.getItem('imageUrl')
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl mx-4 bg-black rounded-lg overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white hover:text-gray-300 text-2xl font-bold"
        >
          ✕
        </button>

        {/* Background Image/Video */}
        <div className="relative h-96">
          {content.trailer && content.trailer.key ? (
            <div className="relative w-full h-full youtube-iframe-container">
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${content.trailer.key}?autoplay=1&loop=1&playlist=${content.trailer.key}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}&disablekb=1&fs=0&cc_load_policy=0&color=white&theme=dark`}
                title={content.title}
                className="absolute inset-0 w-full h-full object-cover"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

            </div>
          ) : backdropUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backdropUrl})` }}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />


          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center mb-2">
              <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                MOVIE
              </div>
              <h1 className="text-3xl font-bold text-white">
                {content.title}
              </h1>
            </div>


            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePlayPause}
                className="bg-white text-black px-6 py-2 rounded flex items-center space-x-2 hover:bg-gray-200"
              >
                {isPlaying ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                    <span className="font-semibold">Pause</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="font-semibold">Resume</span>
                  </>
                )}
              </button>



            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6">
          <div className="text-gray-300 text-sm mb-4 flex items-center space-x-2">
            <span>{content.release_date?.split('-')[0]}</span>
            <span>{Math.floor((content.runtime || 0) / 60)}h{Math.floor((content.runtime || 0) % 60) > 0 ? Math.floor((content.runtime || 0) % 60) + 'm' : ''}</span>
            <span className="px-2 py-0.5 border border-gray-400 rounded text-xs">HD</span>
            <span>{content.vote_average?.toFixed(1) || '0.0'} ⭐</span>
          </div>

          {content.original_title && (
            <div className="text-white text-lg font-bold mb-4">
              {content.original_title}
            </div>
          )}

          <p className="text-white text-sm mb-4 leading-relaxed">
            {content.overview}
          </p>

          {content.production_companies && content.production_companies.length > 0 && (
            <div className="text-gray-300 text-sm mb-2">
              <span className="text-gray-400">Production:</span>  {content.production_companies.slice(0, 3).map((company: { name: string }) => company.name).join(', ')}
            </div>
          )}

          {content.genres && content.genres.length > 0 && (
            <div className="text-gray-300 text-sm">
              <span className="text-gray-400">Genres:</span> {content.genres.map((genre: { name: string }) => genre.name).join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
