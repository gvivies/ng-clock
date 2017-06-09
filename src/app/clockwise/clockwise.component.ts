import { AnimationPlayer, style, animate, AnimationBuilder } from '@angular/animations';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-clockwise',
  templateUrl: './clockwise.component.html',
  styleUrls: ['./clockwise.component.css']
})
export class ClockwiseComponent implements OnInit {

  @Input() clockwiseValue: number;
  @Input() clockwiseClass: string;
  @Input() divider: number;

  @ViewChild('wise')
  public clockwise;

  constructor(private _builder: AnimationBuilder) { }

  ngOnInit() {

    let animationPlayer;

    Observable.interval(1000)
      .subscribe(() => {
        animationPlayer = this.buildAnimationPlayer(this.clockwiseValue, this.clockwise.nativeElement);
        animationPlayer.play();
      });
  }
  // This animation player calculates the rotation angle according to the number
  // of units and if units are hours, minutes or seconds)
  buildAnimationPlayer(nbUnits: number, element: any): AnimationPlayer {
    const angle = this.calcRotationAngle(nbUnits);
    const builder = this._builder.build([
      style({ transform: 'rotate( ' + angle + 'deg )' }),
      animate('1000ms cubic-bezier(.17,.67,.88,.1)', style({ transform: 'rotate( ' + angle + 'deg )' }))
    ]);
    return builder.create(element);
  }

  calcRotationAngle(value: number): number {
    return (value / this.divider) * 360;
  }

}
