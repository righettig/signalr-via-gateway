import { Controller, Post, Body } from '@nestjs/common';
import { SignalRGatewayService } from './signalr-gateway.gateway';

@Controller('signalr-gateway')
export class SignalRGatewayController {
  constructor(private readonly signalRService: SignalRGatewayService) {}

  @Post('send')
  async sendMessage(@Body('user') user: string, @Body('message') message: string) {
    this.signalRService.handleMessage({ user, message });
    return { status: 'Message sent to SignalR Hub successfully' };
  }
}
