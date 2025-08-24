import { useEffect, useState, useRef } from 'react';

interface Trailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  trailer?: Trailer;
}

// Cache for hero movie data
let heroMovieCache: Movie | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useHeroMovie = () => {
  const [data, setData] = useState<Movie | null>(heroMovieCache);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isInitialized = useRef(false);

  const fetchHeroMovie = async () => {
    // Check cache first
    const now = Date.now();
    if (heroMovieCache && (now - cacheTimestamp) < CACHE_DURATION) {
      setData(heroMovieCache);
      return heroMovieCache;
    }

    setIsLoading(true);
    setError(null);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    
    try {
      const apiUrl = `${baseUrl}/client/movies/top?page=1`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const heroMovie = responseData.data;
        if (heroMovie) {
          // Update cache
          heroMovieCache = heroMovie;
          cacheTimestamp = now;
          setData(heroMovie);
        }
        return heroMovie;
      } else {
        const errorMessage = `Hero Movie API failed: ${response.status}`;
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
    if (!isInitialized.current) {
      isInitialized.current = true;
      fetchHeroMovie();
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchHeroMovie,
  };
};
