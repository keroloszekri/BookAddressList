import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassingService {

  private MessageSource = new BehaviorSubject('');
  CurrentMessage = this.MessageSource.asObservable();

  private MessageSource2 = new BehaviorSubject('');
  CurrentMessage2 = this.MessageSource.asObservable();

  constructor() { }

  ChangeCart(Message: string) {
    this.MessageSource.next(Message);
    console.log("in change cart " + this.MessageSource.value);
  }

  ChangeSearch(Message: string) {
    this.MessageSource2.next(Message);
    console.log("in change search " + this.MessageSource2.value);
  }
}
