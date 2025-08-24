import { Controller, Get, HttpStatus, Param, ParseIntPipe, Query, Res } from '@nestjs/common';
import { ErrorHandler } from 'src/common/handler/error.handler';
import type { Response } from 'express'

// Dto
import { Filter } from 'src/common/dto/filter.dto';

// Service
import { MovieService } from './movie.service';

@Controller({ path: 'client/movies' })
export class MovieController {
    constructor(
        private readonly errorHandler: ErrorHandler,
        private readonly movieService: MovieService,
    ) { }

    @Get('auth')
    async auth(@Res() res: Response) {
        try {
            const auth = await this.movieService.auth()
            return res.status(HttpStatus.OK).json({
                success: true,
                message: "succesfully",
            })
        } catch (error) {
            return this.errorHandler.handleError(res, error)
        }
    }

    @Get('config')
    async getConfig(@Res() res: Response) {
        try {
            const config = await this.movieService.getConfig()
            return res.status(HttpStatus.OK).json({
                success: true,
                message: "succesfully",
                data: config || null
            })
        } catch (error) {
            return this.errorHandler.handleError(res, error)
        }
    }

    @Get('top')
    async getTopMovie(@Query() query: Filter, @Res() res: Response) {
        try {
            const top = await this.movieService.getTopMovie(query.language || 'en-US', query.page || 1)
            return res.status(HttpStatus.OK).json({
                success: true,
                message: "succesfully",
                data: top || null
            })
        } catch (error) {
            return this.errorHandler.handleError(res, error)
        }
    }

    @Get('popular')
    async getPopularMovie(@Query() query: Filter, @Res() res: Response) {
        try {
            const popular = await this.movieService.getPopularMovie(query.language || 'en-US', query.page || 1)
            return res.status(HttpStatus.OK).json({
                success: true,
                message: "succesfully",
                data: popular || null
            })
        } catch (error) {
            return this.errorHandler.handleError(res, error)
        }
    }

    @Get('upcoming')
    async getUpcomingMovie(@Query() query: Filter, @Res() res: Response) {
        try {
            const upcoming = await this.movieService.getUpComingMovie(query.language || 'en-US', query.page || 1)
            return res.status(HttpStatus.OK).json({
                success: true,
                message: "succesfully",
                data: upcoming || null
            })
        } catch (error) {
            return this.errorHandler.handleError(res, error)
        }
    }


    @Get('detail/:id')
    async getDetailMovie(@Param('id', ParseIntPipe) id: number, @Query() query: Filter, @Res() res: Response) {
        try {
            const detail = await this.movieService.getDetailMovie(id, query.language || 'en-US')
            return res.status(HttpStatus.OK).json({
                success: true,
                message: "succesfully",
                data: detail || null
            })
        } catch (error) {
            return this.errorHandler.handleError(res, error)
        }
    }
}
