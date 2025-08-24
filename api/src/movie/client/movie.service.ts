import { Injectable } from '@nestjs/common';
import { TmdbService } from '../shared/tmdb.service';

@Injectable()
export class MovieService {
    constructor(
        private readonly tmdbService: TmdbService,
    ) { }

    async auth() {
        try {
            return await this.tmdbService.auth()
        } catch (error) {
            throw error
        }
    }

    async getConfig() {
        try {
            return await this.tmdbService.getConfig()
        } catch (error) {
            throw error
        }
    }

    async getTopMovie(language: string, page: string | number) {
        try {
            const top = await this.tmdbService.getTopMovie(language, page)
            if (top.results.length > 0) {
                const trailer = await this.tmdbService.getMovieTrailer(language, top.results[0].id)
                top.results[0].trailer = trailer.results[0]
            }
            return top.results[0];
        } catch (error) {
            throw error
        }
    }

    async getPopularMovie(language: string, page: string | number) {
        try {
            return await this.tmdbService.getPopularMovie(language, page)
        } catch (error) {
            throw error
        }
    }

    async getUpComingMovie(language: string, page: string | number) {
        try {
            return await this.tmdbService.getUpComingMovie(language, page)
        } catch (error) {
            throw error
        }
    }

    async getDetailMovie(movie_id: number, language: string) {
        try {
            const detail = await this.tmdbService.getMovieDetail(language, movie_id)
            if (detail) {
                const trailer = await this.tmdbService.getMovieTrailer(language, movie_id)
                detail.trailer = trailer.results[0]
            }
            return detail;
        } catch (error) {
            throw error
        }
    }
}
