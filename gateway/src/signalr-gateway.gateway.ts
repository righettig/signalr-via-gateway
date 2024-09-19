import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Injectable()
@WebSocketGateway(3001, { cors: true }) // WebSocket server on port 3001
export class SignalRGatewayService implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    private connection: HubConnection;

    onModuleInit() {
        this.connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5000/chatHub")
            .configureLogging(LogLevel.Information)
            .build();

        this.connection.start()
            .then(() => {
                console.log("Connected to the SignalR hub");

                // Example: Listening to messages from the hub
                this.connection.on('ReceiveMessage', (user: string, message: string) => {
                    // Broadcast the received message to all connected Angular clients
                    this.server.emit('ReceiveMessage', { user, message });
                });
            })
            .catch(err => console.error("Error starting the connection:", err));
    }

    // Listen for messages from the Angular front-end
    @SubscribeMessage('sendMessage')
    handleMessage(@MessageBody() data: { user: string; message: string }) {
        // Relay the message to the ASP.NET Core SignalR Hub
        this.connection.send('SendMessage', data.user, data.message);
    }
}
