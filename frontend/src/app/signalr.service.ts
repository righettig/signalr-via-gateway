import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(private socket: Socket) {}

  // Send message to the NestJS Gateway
  sendMessage(user: string, message: string) {
    this.socket.emit('sendMessage', { user, message });
  }

  // Listen for messages from the NestJS Gateway
  receiveMessages() {
    return this.socket.fromEvent('ReceiveMessage');
  }
}
