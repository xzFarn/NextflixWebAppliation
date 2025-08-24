import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config() // Load environment variables first
  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  // CORS configuration
  app.enableCors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  console.log('server start on port : ', process.env.PORT || 3000)
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
