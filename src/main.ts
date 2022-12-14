import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import * as express from 'express';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new WsAdapter(app));
  app.use(express.static('public'));

  await app.listen(process.env.SERVER_PORT);
  console.log('Server running on:', process.env.SERVER_PORT);
}
bootstrap();
