interface ContentCardProps {
  title: string;
  badge?: string;
  progress?: number;
  imageUrl?: string;
  className?: string;
  movieId?: number;
  onClick?: (movieId: number) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  badge,
  progress,
  imageUrl,
  className = "",
  movieId,
  onClick
}) => {
  const handleClick = () => {
    if (movieId && onClick) {
      onClick(movieId);
    }
  };

  return (
    <div 
      className={`flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 h-20 sm:h-24 md:h-28 lg:h-36 bg-gray-800 rounded relative group cursor-pointer hover:scale-105 transition-transform ${className}`}
      onClick={handleClick}
    >
      {/* Background Image */}
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded"
        />
      )}
      
      <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-600 text-red text-xs px-1 rounded">N</div>
      <img src="vector_n.png" alt="Netflix" className="h-8 mr-2" />
      {badge && (
        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-600 text-white text-xs px-1 sm:px-2 py-1 rounded">
          {badge}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2">
        <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base">{title}</h3>
      </div>
      {progress !== undefined && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
          <div className="h-full bg-red-600" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};
