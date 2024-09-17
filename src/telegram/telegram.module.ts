import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN, // токен вашего бота
    }),
    PrismaModule
  ],
  providers: [TelegramService],
  exports: [TelegramService]
})
export class TelegramModule {}
