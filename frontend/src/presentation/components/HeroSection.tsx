import { useHeroMovie } from '../hooks/useHeroMovie';

interface HeroSectionProps {
  onMoreInfoClick?: (movieId: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onMoreInfoClick }) => {
  const { data: heroMovie, isLoading, error } = useHeroMovie();

  if (isLoading) {
    return (
      <section className="relative h-full flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading netflix...</div>
        </div>
      </section>
    );
  }

  if (error || !heroMovie) {
    return null;
  }

  const backdropUrl = heroMovie.backdrop_path
    ? localStorage.getItem('imageUrl') + 'original' + heroMovie.backdrop_path
    : null;


  const hasTrailer = heroMovie.trailer && heroMovie.trailer.key;

  const handleMoreInfoClick = () => {
    onMoreInfoClick?.(heroMovie.id);
  };

  return (
    <section className="relative h-full flex items-end">
      {hasTrailer ? (
        <div className="absolute inset-0 z-0">
          <iframe
            src={`https://www.youtube.com/embed/${heroMovie.trailer!.key}?autoplay=1&mute=1&loop=1&playlist=${heroMovie.trailer!.key}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}`}
            title={heroMovie.title}
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : backdropUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      ) : null}

      {/* Overlay gradients for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-20">
        <div className="max-w-2xl">
          {/* Series Label */}
          <div className="flex items-center mb-2 sm:mb-4">
            <img src="vector_n.png" alt="Netflix" className="h-8 mr-2" />
            <span className="text-white text-base sm:text-lg font-semibold">MOVIE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-4 text-white drop-shadow-lg">
            {heroMovie.title}
          </h1>

          <div className="flex items-center mb-2 sm:mb-4">
            <img src="Top10.svg" alt="Netflix" className="h-8 mr-2" />
            <span className="text-white text-lg sm:text-xl font-semibold drop-shadow-md">#1 in Movie Today</span>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-gray-200 mb-6 sm:mb-8 max-w-lg leading-relaxed drop-shadow-md">
            {heroMovie.overview}
          </p>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleMoreInfoClick}
              className="bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded flex items-center justify-center sm:justify-start space-x-2 hover:bg-white/30 transition-all duration-200 border border-white/30"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="font-semibold text-sm sm:text-base">More Info</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
