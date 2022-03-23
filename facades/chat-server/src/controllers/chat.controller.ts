import {inject} from '@loopback/core';
import { get, param, post, requestBody } from '@loopback/rest';
import { ChatService } from '../services';

export class ChatController {
  constructor(
    @inject('services.ChatService')
    private readonly chatService: ChatService
  ) {}

  @get('/messages')
  async getMessages(
    @param.header.string('Authorization') token: string,
  ) {
    console.log(this.chatService);
    return this.chatService.getMessages(token);
  }

  @post('/messages')
  async login(
    @param.header.string('Authorization') token: string,
    @requestBody() body: any
  ) {
    return this.chatService.createMessage(body, token);
  }
}
