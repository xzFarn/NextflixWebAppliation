import { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface UpcomingMoviesData {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface UpcomingMoviesResponse {
  success: boolean;
  message: string;
  data: UpcomingMoviesData;
}

export const useUpcomingMovies = (page: number = 1) => {
  const [data, setData] = useState<UpcomingMoviesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingMovies = async () => {
    setIsLoading(true);
    setError(null);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const apiUrl = `${baseUrl}/client/movies/upcoming?page=${page}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
        return responseData;
      } else {
        const errorMessage = `Upcoming Movies API failed: ${response.status}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, [page]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchUpcomingMovies,
  };
};
