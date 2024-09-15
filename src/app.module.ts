import { Module } from '@nestjs/common';
import { ClientsModule, Ctx, MessagePattern, Payload, RmqContext, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ]
})
export class AppModule {}
