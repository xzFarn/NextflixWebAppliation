import { Injectable, HttpException, Logger, ServiceUnavailableException, UnauthorizedException, NotFoundException, InternalServerErrorException, HttpStatus, BadRequestException } from '@nestjs/common'
import { Response } from 'express'

@Injectable()
export class ErrorHandler {
  private readonly logger = new Logger(ErrorHandler.name)

  handleError(res: Response, error: any) {
    this.logger.error(`Error occurred: ${error.message}`, error.stack);

    if (error instanceof HttpException) {
      return res.status(error.getStatus()).json({
        statusCode: error.getStatus(),
        message: error.message,
        error: error.getResponse()
      });
    }

    // Handle unknown errors
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Something went wrong'
    });
  }
}
