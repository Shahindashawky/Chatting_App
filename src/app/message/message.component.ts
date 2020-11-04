import { Component, OnInit ,Input} from '@angular/core';
import { ChatService} from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-messages.models';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: string;
  isOwnMessage: boolean;
  ownEmail: string;
  ownname: string;
  // isOwnMessage1:boolean;
  constructor(private authService: AuthService) {
    authService.authUser().subscribe(user => {
      this.ownEmail = user.email;
      
      this.isOwnMessage = this.ownEmail === this.userEmail;
      
    });
  }

  ngOnInit(chatMessage = this.chatMessage[0]) {
 
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
   
   
  }

}
