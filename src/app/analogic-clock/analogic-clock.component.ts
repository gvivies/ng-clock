import { AnimationBuilder, AnimationPlayer, style, animate } from '@angular/animations';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-analogic-clock',
  templateUrl: './analogic-clock.component.html',
  styleUrls: ['./analogic-clock.component.css']
})
export class AnalogicClockComponent implements OnInit {

  @Input() hours: number;
  @Input() minutes: number;
  @Input() seconds: number;

  constructor() { }

  ngOnInit() {
  }

}
