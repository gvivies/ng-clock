import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { style, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';

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
  private oldHours: number;
  private oldMins: number;

  constructor(private _builder: AnimationBuilder) {

  }

  ngOnInit() {

    const secondArrow = document.getElementById('secondArrow');
    const minArrow = document.getElementById('minArrow');
    const hourArrow = document.getElementById('hourArrow');

    const cardHours = document.getElementById('cardHours');
    const cardMins = document.getElementById('cardMins');
    const cardSeconds = document.getElementById('cardSeconds');

    const cardHoursAnimationPlayer = this.buildCard(cardHours);
    const cardMinsAnimationPlayer = this.buildCard(cardMins);
    const cardSecondsAnimationPlayer = this.buildCard(cardSeconds);

    this.currentDate = new Date();
    this.oldMins = this.currentDate.getMinutes();
    this.oldHours = this.currentDate.getHours();

    let secondAnimationPlayer;
    let minuteAnimationPlayer;
    let hourAnimationPlayer;

    Observable.interval(1000)
      .subscribe(() => {
        this.currentDate = new Date();
        this.seconds = this.currentDate.getSeconds();
        this.minutes = this.currentDate.getMinutes();
        this.hours = this.currentDate.getHours();
        secondAnimationPlayer = this.buildSecondsOrMinsAnimationBuilder(false, this.seconds, secondArrow);
        minuteAnimationPlayer = this.buildSecondsOrMinsAnimationBuilder(false, this.minutes, minArrow);
        hourAnimationPlayer = this.buildSecondsOrMinsAnimationBuilder(true, this.hours, hourArrow);
        secondAnimationPlayer.play();
        minuteAnimationPlayer.play();
        hourAnimationPlayer.play();

        // We animate the hours card only when hour has changed
        if (this.hours !== this.oldHours) {
          this.oldHours = this.hours;
          cardHoursAnimationPlayer.play();
        }

        // We animate the minutes card only when minute has changed
        if (this.minutes !== this.oldMins) {
          this.oldMins = this.minutes;
          cardMinsAnimationPlayer.play();
        }

        // We animate the seconds card each time
        cardSecondsAnimationPlayer.play();
      });
  }

  // This animation player calculates the rotation angle according to the number
  // of units (hours, minutes or seconds)
  buildSecondsOrMinsAnimationBuilder(isHours: boolean, nbUnits: number, element: any): AnimationPlayer {
    const angle = isHours ? this.calcRotationAngleForHours(nbUnits) : this.calcRotationAngleForMinutesSeconds(nbUnits);
    const builder = this._builder.build([
      style({ transform: 'rotate( ' + angle + 'deg )' }),
      animate('1000ms cubic-bezier(.17,.67,.88,.1)', style({ transform: 'rotate( ' + angle + 'deg )' }))
    ]);
    return builder.create(element);
  }

  buildCard(element: any): AnimationPlayer {
    const builder = this._builder.build([
      style({ height: '0', color: '#d2d2d2' }),
      animate('150ms ease', style({ height: '72px', color: '#000' }))
    ]);
    return builder.create(element);
  }

  calcRotationAngleForMinutesSeconds(sOrM: number): number {
    return (sOrM / 60) * 360;
  }

  calcRotationAngleForHours(h: number): number {
    return (h / 12) * 360;
  }

  formatDigit(digit: number): string {
    return (digit < 10) ? '0' + digit : '' + digit;
  }
}
