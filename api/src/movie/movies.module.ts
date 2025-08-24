import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// client
import { MovieController } from './client/movie.controller';
import { MovieService } from './client/movie.service';
import { TmdbService } from './shared/tmdb.service';
import { ErrorHandler } from '../common/handler/error.handler';

@Module({
  imports: [ConfigModule],
  controllers: [MovieController],
  providers: [MovieService, TmdbService, ErrorHandler]
})
export class MovieModule { }
