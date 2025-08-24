import { useEffect, useState } from 'react';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

interface PopularMoviesData {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

interface PopularMoviesResponse {
    success: boolean;
    message: string;
    data: PopularMoviesData;
}

export const usePopularMovies = (page: number = 1) => {
    const [data, setData] = useState<PopularMoviesResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPopularMovies = async () => {
        setIsLoading(true);
        setError(null);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const apiUrl = `${baseUrl}/client/movies/popular?page=${page}`;
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
                const errorMessage = `Popular Movies API failed: ${response.status}`;
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
        fetchPopularMovies();
    }, [page]);

    return {
        data,
        isLoading,
        error,
        refetch: fetchPopularMovies,
    };
};
