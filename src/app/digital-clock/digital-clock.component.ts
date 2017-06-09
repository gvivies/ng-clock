import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit {

  @Input() hours: number;
  @Input() minutes: number;
  @Input() seconds: number;

  constructor() { }

  ngOnInit() {
  }

}
