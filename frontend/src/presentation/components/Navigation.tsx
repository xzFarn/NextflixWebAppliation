'use client';

import { useState } from 'react';
import Link from 'next/link';

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 lg:space-x-6">
            <div className="flex-shrink-0">
              <img src="vector.svg" alt="Netflix" className="h-8" />
            </div>
            <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">Home</Link>
              <Link href="/" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">TV Shows</Link>
              <Link href="/" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">Movies</Link>
              <Link href="/" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">New & Popular</Link>
              <Link href="/" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">My List</Link>
              <Link href="/" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">Browse by Languages</Link>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            {/* Search Section */}
            {isSearchOpen ? (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 sm:w-48 md:w-64 bg-black/50 text-white px-3 sm:px-4 py-1 text-sm sm:text-base rounded border border-white/30 focus:outline-none focus:border-white"
                  autoFocus
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                className="text-white hover:text-gray-300 p-1 sm:p-2"
                onClick={() => setIsSearchOpen(true)}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}

            <button className="text-white hover:text-gray-300 p-1 sm:p-2 hidden sm:block">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 21a1.5 1.5 0 003 0" />
              </svg>
            </button>
            <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer">
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-600 rounded"></div>
              <svg className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-gray-300 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>



        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-gray-800">
            <div className="px-2 py-2 space-y-2">
              <Link href="/" className="block text-white hover:text-gray-300 transition-colors py-2">Home</Link>
              <Link href="/" className="block text-white hover:text-gray-300 transition-colors py-2">TV Shows</Link>
              <Link href="/" className="block text-white hover:text-gray-300 transition-colors py-2">Movies</Link>
              <Link href="/" className="block text-white hover:text-gray-300 transition-colors py-2">New & Popular</Link>
              <Link href="/" className="block text-white hover:text-gray-300 transition-colors py-2">My List</Link>
              <Link href="/" className="block text-white hover:text-gray-300 transition-colors py-2">Browse by Languages</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
