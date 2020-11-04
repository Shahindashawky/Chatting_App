import { User } from './../models/user.models';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  users: User[];
  rooms = [];
  userName: string;
  userEmail:string;
  user: Observable<firebase.User>;
  ownEmail: string;

  constructor(private chat: ChatService ,private router: Router,
    private route: ActivatedRoute,public datepipe: DatePipe ,private authService: AuthService )
   {

     chat.getUsers().valueChanges().subscribe((user: any ) => {
          this.users = user;
         

        });
   
        firebase.database().ref('rooms/').on('value', resp => {
          this.rooms = [];
          this.rooms = snapshotToArray(resp);
 

        });
        authService.authUser().subscribe(user => {
          this.ownEmail = user.email;     
        });
  }

  ngOnInit() {
    this.user = this.authService.authUser();

    this.user.subscribe(user => {
      if (user) {

        this.chat.getUser().valueChanges().subscribe((user: any )=> {
          this.userName = user.displayName;
          this.userEmail =user.email;
          // console.log("select", this.userEmail)
        });  
          }
    });
  }
    enterChatRoom(roomname: string) {
      const chat = { roomname: '', userName: '', message: '', date: '', type: '' ,email:'' };
      chat.roomname = roomname;
      chat.userName = this.userName;
      chat.email=this.userEmail
      chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
      chat.type = 'join';
      chat.message = `${this.userName} enter the room`;
      const newMessage = firebase.database().ref('chats/').push();
      newMessage.set(chat);
  
      firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', (resp: any) => {
        let roomuser = [];
        roomuser = snapshotToArray(resp);
        const user = roomuser.find(x => x.userName === this.userName);
        if (user !== undefined) {
          const userRef = firebase.database().ref('roomusers/' + user.key);
          userRef.update({status: 'online'});
        } else {
          const newroomuser = { roomname: '', userName: '', status: '' };
          newroomuser.roomname = roomname;
          newroomuser.userName = this.userName;
          newroomuser.status = 'online';
          const newRoomUser = firebase.database().ref('roomusers/').push();
          newRoomUser.set(newroomuser);
        }
      });
  
      this.router.navigate(['/newroom',roomname]);
      
    }
    enterprivateRoom(roomname: string) {
      const chat = { roomname: '', userName: '', message: '', date: '', type: '' ,myemail:''};
      chat.roomname = roomname;
      chat.userName = this.userName;
      chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
      chat.type = 'join';
      chat.myemail=this.ownEmail;
      chat.message = `${this.userName} is connect`;
      firebase.database().ref('privatechats/').orderByChild('roomname').equalTo(roomname).on('value', (resp: any) => {
        const room = snapshotToArray(resp).find(x =>( x.myemail === roomname && x.roomname === this.ownEmail));
        if (room !== undefined) {
          chat.roomname = this.ownEmail;
          chat.userName = this.userName;
          chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
          chat.type = 'join';
          chat.myemail=roomname;
          chat.message = `${this.userName} is connect`;
        }
      });
      const newMessage = firebase.database().ref('privatechats/').push();
      newMessage.set(chat);


      firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', (resp: any) => {
        let roomuser = [];
        roomuser = snapshotToArray(resp);
        const user = roomuser.find(x =>( x.email === chat.myemail && x.roomname === roomname));
        // const user = roomuser.find(x =>( x.roomname === chat.roomname && x.email ===chat.myemail ) || (x.roomname === chat.myemail && x.email === roomname));
        if (user !== undefined) {
          const userRef = firebase.database().ref('roomusers/' + user.key);
          userRef.update({status: 'online'});
        } else {
          const newroomuser = { roomname: '', email: '', status: '' };
          newroomuser.roomname = roomname;
          newroomuser.email = chat.myemail;
          newroomuser.status = 'online';
          const newRoomUser = firebase.database().ref('roomusers/').push();
          newRoomUser.set(newroomuser);
        }
      });
  
      this.router.navigate(['/newprivateroom',roomname]);
      
    }
    }

