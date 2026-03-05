import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 4000;

const server = app.getHttpServer();
const router = server._events?.request?._router;

if (router?.stack) {
  const routes = router.stack
    .filter((layer) => layer.route)
    .map((layer) => ({
      method: Object.keys(layer.route.methods)[0]?.toUpperCase(),
      path: layer.route.path,
    }));
  console.log('ROUTES:', routes);
}

  await app.listen(port);
  console.log(`Backend rodando na porta ${port}`);
}
bootstrap();
