import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { style, animation, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cardValue: number;

  private currentDate: Date;
  private hours: number;
  private minutes: number;
  private seconds: number;
  private oldValue: number;

  @ViewChild('card')
  public card;


  constructor(private _builder: AnimationBuilder) { }

  ngOnInit() {

    const cardAnimationPlayer = this.buildCardAnimationPlayer(this.card.nativeElement);
    this.oldValue = this.cardValue;

    Observable.interval(1000)
      .subscribe(() => {

        if (this.cardValue !== this.oldValue) {
          this.oldValue = this.cardValue;
          cardAnimationPlayer.play();
        }
      });
  }

  displayCardValue(): string {
    return (this.cardValue < 10) ? '0' + this.cardValue : '' + this.cardValue;
  }

  buildCardAnimationPlayer(element: any): AnimationPlayer {
    const builder = this._builder.build([
      style({ height: '0', color: '#d2d2d2', boxShadow: '2px 2px 2px #aaa' }),
      animate('150ms ease', style({ height: '72px', color: '#000', boxShadow: 'none' }))
    ]);
    return builder.create(element);
  }
}
