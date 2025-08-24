'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Navigation } from '../presentation/components/Navigation';
import { HeroSection } from '../presentation/components/HeroSection';
import { ContentSection } from '../presentation/components/ContentSection';
import { ContentDetailModal } from '../presentation/components/ContentDetailModal';
import { Footer } from '../presentation/components/Footer';
import { ScrollbarHide } from '../presentation/components/ScrollbarHide';
import { useAuthAPI } from '../presentation/hooks/useAuthAPI';
import { useMovieDetail } from '../presentation/hooks/useMovieDetail';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ใช้ hook สำหรับ auth API
  const { isLoading, error } = useAuthAPI();

  // ใช้ hook สำหรับ movie detail
  const { data: movieDetail, isLoading: movieDetailLoading, fetchMovieDetail, clearData } = useMovieDetail();

  const handleMovieClick = useCallback(async (movieId: number) => {
    setIsModalOpen(true);
    await fetchMovieDetail(movieId);
  }, [fetchMovieDetail]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    clearData();
  }, [clearData]);

  // Disable scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-black text-white">

      <Navigation />
      <div className="h-screen">
        <HeroSection onMoreInfoClick={handleMovieClick} />
      </div>

      <ContentSection title="Popular on Netflix" items={[]} onMovieClick={handleMovieClick} />
      <ContentSection title="Upcoming Movies" items={[]} onMovieClick={handleMovieClick} />

      {/* Movie Detail Modal */}
      <ContentDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={movieDetail}
        isLoading={movieDetailLoading}
      />

      <Footer />
      <ScrollbarHide />
    </div>
  );
}
