import { TimerService } from './../timer.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit {

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
