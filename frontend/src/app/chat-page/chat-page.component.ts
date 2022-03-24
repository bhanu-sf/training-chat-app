import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { ChatService } from './chat.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  messages: any[];
  user: any;

  constructor(protected http: HttpClient, protected chatService: ChatService) {
    this.messages = this.chatService.loadMessages();
  }

  ngOnInit(): void {
    this.http
      .get(`${environment.baseUrl}/auth/me`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      })
      .pipe(
        mergeMap((res: any) => {
          this.user = res;
          localStorage.setItem('userTenantId', res.userTenantId);
          console.log(res);
          return this.http.get(`${environment.baseUrl}/messages`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          });
        })
      )
      .subscribe((res) => {
        console.log(res);
        let data = res as any[];
        this.messages = data.map((v) => {
          console.log(v);
          return {
            text: v.body,
            date: moment(v.createdOn).toDate(),
            reply: this.user.userTenantId === v.modifiedBy,
            type: 'text',
            // files: files,
            user: {
              name: this.user.userTenantId === v.modifiedBy ? this.user?.firstName : 'Jon Doe',
              avatar: 'https://i.gifer.com/no.gif',
            },
          };
        });
      });
  }

  sendMessage(event: any) {
    /*
    {
      text: event.message,
      date: new Date(),
      reply: true,
      type: 'text',
      // files: files,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
      },
    }
    */

    this.http
      .post(
        `${environment.baseUrl}/messages`,
        {
          body: event.message,
          channelId: '91e9607f-2dbc-4ac3-91e4-f1824c39d070',
          channelType: 'peer_to_peer',
          toUserId: '85ebe65a-cf47-ec7c-7922-ba5bc593a5ed',
        },
        {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        }
      )
      .subscribe((v: any) => {
        this.messages.push({
          text: v.body,
          date: moment(v.createdOn).toDate(),
          reply: this.user.userTenantId === v.modifiedBy,
          type: 'text',
          user: {
            name: this.user.userTenantId === v.modifiedBy ? this.user?.firstName : 'Jon Doe',
            avatar: 'https://i.gifer.com/no.gif',
          },
        });
      });
  }
}
