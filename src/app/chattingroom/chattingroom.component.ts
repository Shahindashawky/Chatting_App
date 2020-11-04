import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';


@Component({
  selector: 'app-chattingroom',
  templateUrl: './chattingroom.component.html',
  styleUrls: ['./chattingroom.component.scss']
})
export class ChattingroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;
  constructor( ) {
    
   }

  ngOnInit(): void {
  }
  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
    = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  
    
    
  
}
