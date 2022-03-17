import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  loadMessages() {
    return [];
  }

  reply(message: any) {
    return {
      text: `You entered ${message}`,
      date: new Date(),
      reply: false,
      type:  'text',
      files: [],
      user: {
        name: 'Bot',
        avatar: 'https://i.gifer.com/no.gif',
      },
    }
  }
}
