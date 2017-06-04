import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { style, animate, AnimationBuilder } from '@angular/animations';

const rotatingSecond = { transform: 'rotate( {{ seconds }} )' };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  private time: number;
  private currentDate: Date;
  private hours: number;
  private minutes: number;
  private seconds: number;

  constructor(private _builder: AnimationBuilder) {

  }

  ngOnInit() {
    const secondArrow = document.getElementById('secondArrow');
    const minArrow = document.getElementById('minArrow');
    const hourArrow = document.getElementById('hourArrow');

    Observable.interval(1000)
      .subscribe(() => {
        this.currentDate = new Date();
        this.seconds = this.currentDate.getSeconds();
        this.minutes = this.currentDate.getMinutes();
        this.hours = this.currentDate.getHours();

        const secondAnimationPlayer = this.buildSecondsAnimationWithBuilder(secondArrow);
        const minuteAnimationPlayer = this.buildMinutesAnimationWithBuilder(minArrow);
        const hourAnimationPlayer = this.buildHoursAnimationWithBuilder(hourArrow);

        secondAnimationPlayer.play();
        minuteAnimationPlayer.play();
        hourAnimationPlayer.play();
      });
  }

  buildSecondsAnimationWithBuilder(element: any) {
    const secondsAnimation = this._builder.build([
      style({ transform: 'rotate( ' + this.calcRotationForMinutesSeconds(this.seconds) + 'deg )' }),
      animate(1000, style({ transform: 'rotate( ' + this.calcRotationForMinutesSeconds(this.seconds) + 'deg )' }))
    ]);
    return secondsAnimation.create(element);
  }

  buildMinutesAnimationWithBuilder(element: any) {
    const minutesAnimation = this._builder.build([
      style({ transform: 'rotate( ' + this.calcRotationForMinutesSeconds(this.minutes) + 'deg )' }),
      animate(1000, style({ transform: 'rotate( ' + this.calcRotationForMinutesSeconds(this.minutes) + 'deg )' }))
    ]);
    return minutesAnimation.create(element);
  }

  buildHoursAnimationWithBuilder(element: any) {
    const hoursAnimation = this._builder.build([
      style({ transform: 'rotate( ' + this.calcRotationForHours(this.hours) + 'deg )' }),
      animate(1000, style({ transform: 'rotate( ' + this.calcRotationForHours(this.hours) + 'deg )' }))
    ]);
    return hoursAnimation.create(element);
  }

  calcRotationForMinutesSeconds(sOrM: number): number {
    return (sOrM / 60) * 360;
  }

  calcRotationForHours(h: number): number {
    return (h / 12) * 360;
  }

}
