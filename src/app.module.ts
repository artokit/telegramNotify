import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TelegramModule } from './telegram/telegram.module';


@Module({
  controllers: [AppController],
  imports: [
    TelegramModule,
    PrismaModule,
    ConfigModule.forRoot(
      {
        envFilePath: `.env`
      }
    ),
  ]
})
export class AppModule {}
