import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  messages: any[];

  constructor(protected chatService: ChatService) {
    this.messages = this.chatService.loadMessages();
  }

  sendMessage(event: any) {
    

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: 'text',
      // files: files,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
    const botReply = this.chatService.reply(event.message);
    if (botReply) {
      setTimeout(() => { this.messages.push(botReply) }, 500);
    }
  }

}
