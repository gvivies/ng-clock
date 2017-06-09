import { TimerService } from './../timer.service';
import { AnimationBuilder, AnimationPlayer, style, animate } from '@angular/animations';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-analogic-clock',
  templateUrl: './analogic-clock.component.html',
  styleUrls: ['./analogic-clock.component.css']
})
export class AnalogicClockComponent implements OnInit {

  hours: number;
  minutes: number;
  seconds: number;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.timerService.getHours().subscribe((hours) => {
      this.hours = hours;
    });
    this.timerService.getMinutes().subscribe((minutes) => {
      this.minutes = minutes;
    });
    this.timerService.getSeconds().subscribe((seconds) => {
      this.seconds = seconds;
    });
  }

}
