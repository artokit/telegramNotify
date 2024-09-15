import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy){}

  @EventPattern(undefined)
  async handleBookCreatedEvent(data: Record<string, unknown>) {
    const message = await this.client.send({cmd: "hui"}, 'Progressive Coder');
    console.log(message);
    console.log(data);
  }

  @MessagePattern({cmd: 'greeting-async'})
  async hui(data: Record<any, any>) {
    console.log("svo");
  }
}