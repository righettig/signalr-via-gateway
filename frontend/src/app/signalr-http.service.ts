import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private apiUrl = 'http://localhost:3000/signalr-gateway'; // NestJS API URL

  constructor(private http: HttpClient) {}

  sendMessage(user: string, message: string) {
    return this.http.post(`${this.apiUrl}/send`, { user, message });
  }
}
