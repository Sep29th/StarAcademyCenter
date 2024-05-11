import { Module } from '@nestjs/common';
import { EventsGateway } from './gateways/event.gateway';

@Module({
  providers: [EventsGateway],
})
export class SocketModule {}
