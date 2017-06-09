import { TimerService } from './timer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { style, animation, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { Subject } from "rxjs/Subject";

const rotatingSecond = { transform: 'rotate( {{ seconds }} )' };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private timerService: TimerService) {
  }

  ngOnInit() {

    Observable.interval(1000)
      .subscribe(() => {
        const currentDate = new Date();
        this.timerService.setHours(currentDate.getHours());
        this.timerService.setMinutes(currentDate.getMinutes());
        this.timerService.setSeconds(currentDate.getSeconds());
      });
  }

}
