import { Module } from '@nestjs/common';
import { SignalRGatewayController } from './signalr-gateway.controller';
import { SignalRGatewayService } from './signalr-gateway.gateway';

@Module({
  imports: [],
  controllers: [SignalRGatewayController],
  providers: [SignalRGatewayService],
})
export class AppModule {}
