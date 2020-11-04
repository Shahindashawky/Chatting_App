import { Component, OnInit ,OnChanges } from '@angular/core';
import { AngularFireList,AngularFireDatabase } from 'angularfire2/database';
import { ChatMessage } from '../models/chat-messages.models';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {
  feedRef: AngularFireList<ChatMessage>;
  feed: Observable<ChatMessage[]>;
  constructor(
    private db: AngularFireDatabase
    ) {

   }

  ngOnInit() {
    this.feedRef = this.db.list('messages');
    this.feed = this.feedRef.valueChanges();
    this.feed.subscribe(res => console.log(res));
  }

  ngOnChanges() {
    this.feedRef = this.db.list('messages');
    this.feed = this.feedRef.valueChanges();
    this.feed.subscribe(res => console.log(res));
  }

}

