import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class TimerService {

  private hours: Subject<number>;
  private minutes: Subject<number>;
  private seconds: Subject<number>;

  constructor() { 
    this.hours = new Subject<number>();
    this.minutes = new Subject<number>();
    this.seconds = new Subject<number>();
  }

  public getHours(): Observable<number> {
    return this.hours.asObservable();
  }

  public setHours(hr: number) {
    this.hours.next(hr);
  }

  public getMinutes(): Observable<number> {
    return this.minutes.asObservable();
  }

  public setMinutes(mn: number) {
    this.minutes.next(mn);
  }

  public getSeconds(): Observable<number> {
    return this.seconds.asObservable();
  }

  public setSeconds(s: number) {
    this.seconds.next(s);
  }

}
