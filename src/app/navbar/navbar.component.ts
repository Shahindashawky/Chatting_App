import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
  userEmail: string;
  userName: string;
  roomForm: FormGroup;

  roomname = '';
  ref = firebase.database().ref('rooms/');

  constructor(private router: Router,
    private route: ActivatedRoute,private formBuilder:FormBuilder,
    private authService: AuthService , private chat:ChatService
    ) { }

  ngOnInit() {
    this.user = this.authService.authUser();

    this.user.subscribe(user => {
      if (user) {

        this.userEmail = user.email;
        this.chat.getUser().valueChanges().subscribe((user: any )=> {
          this.userName = user.displayName;
        
        });  
          }
    });
    this.roomForm = this.formBuilder.group({
      'roomname' : [null, Validators.required]
    });
  }
  onFormSubmit(form: any) {
    const room = form;
    this.ref.orderByChild('roomname').equalTo(room.roomname).once('value', (snapshot: any) => {
      if (snapshot.exists()) {
          alert("this room is exist")
      } else {
        const newRoom = firebase.database().ref('rooms/').push();
        newRoom.set(room);
        this.router.navigate(['/chat']);

      }
    });
    
  }
  logout() {
    this.authService.logout();
  }

}
