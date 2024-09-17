import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    private prisma: PrismaService
    ) {}

  async sendAllUsersByEventId(eventId: string) {
    let res = await this.prisma.events.findFirst({
      include: {
        participants: true
      },
      where: {id: eventId}
    });
    for (let user of res.participants) {
      try {
        if (user.telegramId) {
          await this.bot.telegram.sendMessage(user.telegramId, `Событие № ${eventId} началось`);
        }
      }
      catch (e) {

      }
    }
  }
}
