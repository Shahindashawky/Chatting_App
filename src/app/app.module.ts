// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MessageComponent } from './message/message.component';
import { FeedComponent } from './feed/feed.component';
import { ChattingroomComponent } from './chattingroom/chattingroom.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

//material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NewRoomComponent } from './new-room/new-room.component';
import { NewprivateRoomComponent } from './newprivate-room/newprivate-room.component';


@NgModule({
  declarations: [
    AppComponent,
    UserItemComponent,
    UserListComponent,
    NavbarComponent,
    SignupFormComponent,
    LoginFormComponent,
    MessageComponent,
    FeedComponent,
    ChattingroomComponent,
    ChatFormComponent,
    NewRoomComponent,
    NewprivateRoomComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,MatIconModule,MatSidenavModule,MatInputModule,MatButtonModule,ScrollingModule,MatSnackBarModule,
    MatListModule, MatDialogModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    
  ],
  providers: [AuthService , ChatService ,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
