import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TmdbService {
    private readonly axiosInstance: AxiosInstance;
    private readonly logger = new Logger(TmdbService.name);

    constructor(
        private readonly configService: ConfigService
    ) {
        const tmdbUrl = this.configService.get<string>('TMDB_URL');
        const accessToken = this.configService.get<string>('ACCESS_TOKEN');
        this.axiosInstance = axios.create({
            baseURL: tmdbUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
    }

    async auth() {
        try {
            const response = await this.axiosInstance.get('/authentication');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getConfig() {
        try {
            const response = await this.axiosInstance.get('/configuration');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getTopMovie(language: string, page: string | number) {
        try {
            const response = await this.axiosInstance.get(`/movie/top_rated?language=${language}&page=${page}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getPopularMovie(language: string, page: string | number) {
        try {
            const response = await this.axiosInstance.get(`/movie/popular?language=${language}&page=${page}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getUpComingMovie(language: string, page: string | number) {
        try {
            const response = await this.axiosInstance.get(`/movie/upcoming?language=${language}&page=${page}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getMovieDetail(language: string, movie_id: string | number) {
        try {
            const response = await this.axiosInstance.get(`/movie/${movie_id}?language=${language}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getMovieTrailer(language: string, movie_id: string | number) {
        try {
            const response = await this.axiosInstance.get(`/movie/${movie_id}/videos?language=${language}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
