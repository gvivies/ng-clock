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

    Observable.interval(500)
      .subscribe(() => {
        this.currentDate = new Date();
        this.seconds = this.currentDate.getSeconds();
        this.minutes = this.currentDate.getMinutes();
        this.hours = this.currentDate.getHours();

        const secondAnimationPlayer = this.buildSecondsOrMinsAnimationBuilder(false, this.seconds, secondArrow);
        const minuteAnimationPlayer = this.buildSecondsOrMinsAnimationBuilder(false, this.minutes, minArrow);
        const hourAnimationPlayer = this.buildSecondsOrMinsAnimationBuilder(true, this.hours, hourArrow);

        secondAnimationPlayer.play();
        minuteAnimationPlayer.play();
        hourAnimationPlayer.play();
      });
  }

  buildSecondsOrMinsAnimationBuilder(isHours: boolean, nbUnits: number, element: any) {
    const angle = isHours ? this.calcRotationForHours(nbUnits) : this.calcRotationForMinutesSeconds(nbUnits);
    const builder = this._builder.build([
      style({ transform: 'rotate( ' + angle + 'deg )' }),
      animate(1000, style({ transform: 'rotate( ' + angle + 'deg )' }))
    ]);
    return builder.create(element);
  }

  calcRotationForMinutesSeconds(sOrM: number): number {
    return (sOrM / 60) * 360;
  }

  calcRotationForHours(h: number): number {
    return (h / 12) * 360;
  }

}
