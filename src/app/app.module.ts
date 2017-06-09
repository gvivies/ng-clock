import { TimerService } from './timer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { DigitalClockComponent } from './digital-clock/digital-clock.component';
import { AnalogicClockComponent } from './analogic-clock/analogic-clock.component';
import { ClockwiseComponent } from './clockwise/clockwise.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    DigitalClockComponent,
    AnalogicClockComponent,
    ClockwiseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
