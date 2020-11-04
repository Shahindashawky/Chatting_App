import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ChattingroomComponent } from './chattingroom/chattingroom.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { NewprivateRoomComponent } from './newprivate-room/newprivate-room.component';

const routes: Routes = [
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'chat', component: ChattingroomComponent },
  { path: 'newroom/:roomname', component: NewRoomComponent },
  { path: 'newprivateroom/:roomname', component: NewprivateRoomComponent },


  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
