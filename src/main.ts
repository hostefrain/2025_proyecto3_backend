import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mkdirSync } from 'fs';
import { join } from 'path';
import { METHODS } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true,
  })
  const uploadPaths = [
    join(process.cwd(), 'uploads', 'imagenes'),
    join(process.cwd(), 'uploads', 'archivos'),
  ];

  uploadPaths.forEach(path => {
    try {
      mkdirSync(path, { recursive: true });
    } catch (error) {
      // La carpeta ya existe
    }
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
