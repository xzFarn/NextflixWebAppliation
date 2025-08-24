import { useState, useEffect } from 'react';

interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    runtime: number;
    genres: Array<{ id: number; name: string }>;
    credits?: {
        cast: Array<{ name: string; character: string }>;
    };
}

export const useMovieDetail = () => {
    const [data, setData] = useState<MovieDetail | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMovieDetail = async (movieId: number) => {
        setIsLoading(true);
        setError(null);
        setData(null);

        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const apiUrl = `${baseUrl}/client/movies/detail/${movieId}`;
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }

            const movieData = await response.json();
            setData(movieData.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

         const clearData = () => {
         setData(null);
         setError(null);
         // Reset any progress or state when clearing data
     };

    return { data, isLoading, error, fetchMovieDetail, clearData };
};
