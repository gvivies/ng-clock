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

  private time: number;
  private currentDate: Date;
  private hours: number;
  private minutes: number;
  private seconds: number;
  private oldHours: number;
  private oldMins: number;

  @ViewChild('secondArrow')
  public secondArrow;

  @ViewChild('minArrow')
  public minArrow;

  @ViewChild('hourArrow')
  public hourArrow;

  @ViewChild('cardHours')
  public cardHours;

  @ViewChild('cardMins')
  public cardMins;

  @ViewChild('cardSeconds')
  public cardSeconds;

  constructor(private _builder: AnimationBuilder) {

  }

  ngOnInit() {

    const cardHoursAnimationPlayer = this.buildCard(this.cardHours.nativeElement);
    const cardMinsAnimationPlayer = this.buildCard(this.cardMins.nativeElement);
    const cardSecondsAnimationPlayer = this.buildCard(this.cardSeconds.nativeElement);

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
        secondAnimationPlayer = this.buildSecondsOrMinsAnimationBuilder(false, this.seconds, this.secondArrow.nativeElement);
        minuteAnimationPlayer = this.buildSecondsOrMinsAnimationBuilder(false, this.minutes, this.minArrow.nativeElement);
        hourAnimationPlayer = this.buildSecondsOrMinsAnimationBuilder(true, this.hours, this.hourArrow.nativeElement);
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
