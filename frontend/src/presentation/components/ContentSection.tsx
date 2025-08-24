import { ContentCard } from './ContentCard';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { useUpcomingMovies } from '../hooks/useUpcomingMovies';

interface ContentSectionProps {
  title: string;
  items: Array<{
    title: string;
    badge?: string;
    progress?: number;
  }>;
  onMovieClick?: (movieId: number) => void;
}

export const ContentSection: React.FC<ContentSectionProps> = ({ title, items, onMovieClick }) => {
  // ใช้ hook สำหรับ Popular on Netflix
  const { data: popularData, isLoading: popularLoading, error: popularError } = usePopularMovies(1);

  // ใช้ hook สำหรับ Upcoming Movies
  const { data: upcomingData, isLoading: upcomingLoading, error: upcomingError } = useUpcomingMovies(1);

  // สร้าง items สำหรับ Popular on Netflix จาก API data (ไม่รวม index แรก)
  const getPopularItems = () => {
    if (title === "Popular on Netflix" && popularData?.data?.results) {
      const items = popularData.data.results.map((movie) => ({
        title: movie.title,
        imageUrl: localStorage.getItem('imageUrl') + 'w440_and_h660_face' + movie.poster_path,
        id: movie.id,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
      }));
      return items;
    }
    return items; // ใช้ mock data สำหรับส่วนอื่นๆ
  };

  // สร้าง items สำหรับ Upcoming Movies จาก API data
  const getUpcomingItems = () => {
    if (title === "Upcoming Movies" && upcomingData?.data?.results) {
      const items = upcomingData.data.results.map((movie) => ({
        title: movie.title,
        imageUrl: localStorage.getItem('imageUrl') + 'w440_and_h660_face' + movie.poster_path,
        id: movie.id,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
      }));
      return items;
    }
    return items; // ใช้ mock data สำหรับส่วนอื่นๆ
  };

  // เลือก items ตาม title
  const getDisplayItems = () => {
    if (title === "Popular on Netflix") {
      return getPopularItems();
    } else if (title === "Upcoming Movies") {
      return getUpcomingItems();
    }
    return items;
  };

  const displayItems = getDisplayItems();
  

  // ตรวจสอบ loading และ error ตาม title
  const isLoading = title === "Popular on Netflix" ? popularLoading :
    title === "Upcoming Movies" ? upcomingLoading : false;

  const error = title === "Popular on Netflix" ? popularError :
    title === "Upcoming Movies" ? upcomingError : null;

  // ตรวจสอบว่ามีข้อมูล API หรือไม่
  const hasApiData = title === "Popular on Netflix" ? !!popularData?.data?.results :
    title === "Upcoming Movies" ? !!upcomingData?.data?.results : false;

  return (
    <section className="mb-6 sm:mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{title}</h2>

        {/* แสดง loading สำหรับ API sections */}
        {(title === "Popular on Netflix" || title === "Upcoming Movies") && isLoading && (
          <div className="text-gray-400 mb-4">Loading {title.toLowerCase()}...</div>
        )}

        {/* แสดง error สำหรับ API sections */}
        {(title === "Popular on Netflix" || title === "Upcoming Movies") && error && (
          <div className="text-red-400 mb-4">Error: {error}</div>
        )}

        {/* แสดง placeholder สำหรับ API sections เมื่อยังไม่มีข้อมูล */}
        {(title === "Popular on Netflix" || title === "Upcoming Movies") && !isLoading && !hasApiData && !error && (
          <div className="text-gray-400 mb-4">Loading {title.toLowerCase()}...</div>
        )}

        <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {displayItems.map((item, index) => (
            <ContentCard
              key={(title === "Popular on Netflix" || title === "Upcoming Movies") ? (item as any).id : index}
              title={item.title}
              badge={(item as any).badge}
              progress={(item as any).progress}
              imageUrl={(item as any).imageUrl}
              movieId={(item as any).id}
              onClick={onMovieClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
