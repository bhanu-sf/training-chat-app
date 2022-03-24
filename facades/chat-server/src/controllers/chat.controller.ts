import {inject} from '@loopback/core';
import {Filter} from '@loopback/repository';
import {get, param, post, requestBody} from '@loopback/rest';
import {Message} from '../models';
import {ChatService} from '../services';

export class ChatController {
  constructor(
    @inject('services.ChatService')
    private readonly chatService: ChatService,
  ) {}

  @get('/messages')
  async getMessages(@param.header.string('Authorization') token: string) {
    const filter: Filter<Message> = {
      order: ['createdOn ASC'],
    };
    return this.chatService.getMessages(token, filter);
  }

  @post('/messages')
  async login(
    @param.header.string('Authorization') token: string,
    @requestBody() body: any,
  ) {
    return this.chatService.createMessage(body, token);
  }
}
