import {inject, Provider} from '@loopback/core';
import { Filter } from '@loopback/repository';
import {getService} from '@loopback/service-proxy';
import {ChatServiceDataSource} from '../datasources';
import { Message, MessageRecipient } from '../models';

export interface ChatService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.

  getMessages(
    token: string,
    filter?: Filter<Message>,
  ): Promise<Message[]>;

  createMessage(data: Message, token: string): Promise<Message>;

  getMessageRecipients(
    token: string,
    filter?: Filter<MessageRecipient>,
  ): Promise<MessageRecipient>[];
  createMessageRecipients(
    data: MessageRecipient,
    token: string,
  ): Promise<MessageRecipient>;

}

export class ChatServiceProvider implements Provider<ChatService> {
  constructor(
    // chatService must match the name property in the datasource json file
    @inject('datasources.chatService')
    protected dataSource: ChatServiceDataSource = new ChatServiceDataSource(),
  ) {}

  value(): Promise<ChatService> {
    return getService(this.dataSource);
  }
}
