import { useEffect, useState } from 'react';

export const useAuthAPI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const auth = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${baseUrl}/client/movies/auth`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorMessage = `Auth API failed: ${response.status}`;
                setError(errorMessage);
                return false;
            }

            localStorage.setItem('isLogin', 'true');

            try {
                const configResponse = await fetch(`${baseUrl}/client/movies/config`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!configResponse.ok) {
                    const errorMessage = `Config API failed: ${configResponse.status}`;
                    setError(errorMessage);
                    return false;
                }

                const configData = await configResponse.json();
                const imageUrl = configData.data.images.secure_base_url;
                localStorage.setItem('imageUrl', imageUrl)

                return true;

            } catch (configError) {
                const errorMessage = configError instanceof Error ? configError.message : 'Config API error';
                setError(errorMessage);
                return false;
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Auth API error';
            setError(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        auth().catch((error) => {
            console.warn('Auth process failed:', error);
            setError('Authentication process failed');
            setIsLoading(false);
        });
    }, []);

    return {
        auth,
        isLoading,
        error,
    };
};
