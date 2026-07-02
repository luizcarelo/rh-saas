import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Proteção contra vulnerabilidades web conhecidas (Headers HTTP seguros)
  app.use(helmet());

  // Ativa o CORS de forma controlada (Mudar em produção para os domínios do SaaS)
  app.enableCors({ origin: '*' });

  // Força a validação de todas as requisições baseadas nos DTOs com class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0");
  console.log(`🚀 API do SaaS de RH rodando com segurança na porta: ${port}`);
}
bootstrap();
