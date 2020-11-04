import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { ChatService } from '../services/chat.service';
import {Location} from '@angular/common';


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
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent implements OnInit , AfterViewChecked{
  @ViewChild('scroller') private feedContainer: ElementRef;
  chatForm: FormGroup;

  userName = '';
  roomname = '';
  message = '';
  users = [];
  chats = [];
  ownEmail: string;
  email: string;
  user: Observable<firebase.User>;
  mySubscription;
  constructor(private authService: AuthService,private router: Router,private chat: ChatService,private _location: Location,
    private route: ActivatedRoute,public datepipe: DatePipe ,private formBuilder: FormBuilder) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.mySubscription = this.router.events.subscribe((event) => {
     
      }); 
      authService.authUser().subscribe(user => {
        this.ownEmail = user.email;     
      });
      this.roomname = this.route.snapshot.params.roomname;
      // console.log("room",this.roomname)
      firebase.database().ref('chats/').on('value', resp => {
        this.chats = [];
        this.chats = snapshotToArray(resp);
      });
      firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp2: any) => {
        const roomusers = snapshotToArray(resp2);
        this.users = roomusers.filter(x => x.status === 'online');
      
      });
      
    }
    ngOnDestroy(){
      if (this.mySubscription) {
        this.mySubscription.unsubscribe();
      }
    }
    reLoad(){
      this.router.navigate([this.route.url])
    }
  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
    this.user = this.authService.authUser();

    this.user.subscribe(user => {
      if (user) {

        this.chat.getUser().valueChanges().subscribe((user: any )=> {
          this.userName = user.displayName;
        });  
          }
    });

  }

  onFormSubmit(form: any) {
    const chat = form;
    chat.roomname = this.roomname;
    chat.userName = this.userName;
    chat.email=this.ownEmail;
    const timestamp = this.getTimeStamp();

    chat.date = timestamp;
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
  }
  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

     return (date + ' ' + time);
                }


  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
    = this.feedContainer.nativeElement.scrollHeight;
  }
  backClicked() {
    this._location.back();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
