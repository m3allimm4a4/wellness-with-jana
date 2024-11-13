import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss',
})
export class ComingSoonComponent implements OnInit, OnDestroy {
  expired = signal<boolean>(false);
  days = signal<number>(0);
  hours = signal<number>(0);
  minutes = signal<number>(0);
  seconds = signal<number>(0);

  private interval: any = 0;

  ngOnInit() {
    const countDownDate = new Date('Dec 1, 2024 15:37:25').getTime();

    // Update the count down every 1 second
    this.interval = setInterval(() => {
      // Get todays date and time
      const now = new Date().getTime();

      // Find the distance between now an the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      this.days.set(Math.floor(distance / (1000 * 60 * 60 * 24)));
      this.hours.set(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      this.minutes.set(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      this.seconds.set(Math.floor((distance % (1000 * 60)) / 1000));

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(this.interval);
        this.expired.set(true);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
