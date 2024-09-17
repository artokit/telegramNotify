import { Controller } from "@nestjs/common";
import {
  MessagePattern,
  Ctx,
  Transport, Payload, KafkaContext,
} from '@nestjs/microservices';
import { NotifyEventDto } from './dto/notify-event-dto';
import { TelegramService } from './telegram/telegram.service';

@Controller()
export class AppController {
  constructor(
    private telegrafService: TelegramService
  ) {}

  @MessagePattern("notifications.telegram.event-soon", Transport.KAFKA)
  async eventSoon(@Payload() data: string, @Ctx() context: KafkaContext) {
    console.log("test");
  }

  @MessagePattern("notifications.telegram.all", Transport.KAFKA)
  async notifyAboutEvent(@Payload() data: NotifyEventDto, @Ctx() context: KafkaContext) {
    try {
      if (data.eventId) {
        await this.telegrafService.sendAllUsersByEventId(data.eventId);
      }
    }
    catch (e) {
      console.log(e);
    }
  }
}