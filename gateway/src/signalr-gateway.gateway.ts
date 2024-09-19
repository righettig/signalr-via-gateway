import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
@WebSocketGateway(3001, { cors: true }) // WebSocket server on port 3001
export class SignalRGatewayService implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    private signalRSocket: Socket;

    onModuleInit() {
        console.log("MODULE INIT");

        // Connect to the ASP.NET Core SignalR Hub
        this.signalRSocket = io('http://localhost:5000/chatHub');

        //this.signalRSocket.connect();

        this.signalRSocket.on('connect', () => {
            console.log('connect', this.signalRSocket.connected);
        });

        this.signalRSocket.on('disconnect', () => {
            console.log('connect', this.signalRSocket.connected);
        });

        // Listen for incoming messages from SignalR Hub
        this.signalRSocket.on('ReceiveMessage', (user: string, message: string) => {
            // Broadcast the received message to all connected Angular clients
            this.server.emit('ReceiveMessage', { user, message });
        });

        setInterval(() => {
            this.server.emit('ReceiveMessage', { user: "foo", message: "bar" });
        }, 3000);
    }

    // Listen for messages from the Angular front-end
    @SubscribeMessage('sendMessage')
    handleMessage(@MessageBody() data: { user: string; message: string }) {
        //console.log("FOO");
        console.log("active: " + this.signalRSocket.active);
        console.log("connected: " + this.signalRSocket.connected);

        // Relay the message to the ASP.NET Core SignalR Hub
        this.signalRSocket.emit('SendMessage', data.user, data.message);
    }
}
