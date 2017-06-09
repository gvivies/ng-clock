import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { style, animation, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';

const rotatingSecond = { transform: 'rotate( {{ seconds }} )' };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  private currentDate: Date;
  private hours: number;
  private minutes: number;
  private seconds: number;

  constructor() {
  }

  ngOnInit() {

    Observable.interval(1000)
      .subscribe(() => {
        this.currentDate = new Date();
        this.seconds = this.currentDate.getSeconds();
        this.minutes = this.currentDate.getMinutes();
        this.hours = this.currentDate.getHours();
      });
  }

}
