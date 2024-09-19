import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalRService } from './signalr.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  user = 'John Doe';
  message = 'Hello from Angular';
  receivedMessages: string[] = [];

  constructor(private signalRService: SignalRService) {}

  ngOnInit() {
    // Start listening for messages from the NestJS Gateway
    this.signalRService.receiveMessages().subscribe((data: any) => {
      this.receivedMessages.push(`${data.user}: ${data.message}`);
    });
  }

  sendMessage() {
    // Send message to the NestJS Gateway
    this.signalRService.sendMessage(this.user, this.message);
  }
}
