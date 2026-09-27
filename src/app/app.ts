import {
  Component,
  ChangeDetectorRef,
  OnDestroy,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit, OnDestroy {

  submitted = false;

  private countdownTimer?: ReturnType<typeof setInterval>;

  rsvp = {
    name: '',
    attendance: 'yes',
    guests: 1,
    message: ''
  };

  countdown = {
    days: '000',
    hours: '00',
    minutes: '00',
    seconds: '00'
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateCountdown();

    this.countdownTimer = setInterval(() => {
      this.updateCountdown();

      // Force Angular to refresh the countdown on screen
      this.cdr.detectChanges();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }

  private updateCountdown(): void {
    const weddingDate = new Date(
      '2026-10-18T17:00:00'
    ).getTime();

    const now = Date.now();

    const difference = weddingDate - now;

    if (difference <= 0) {
      this.countdown = {
        days: '000',
        hours: '00',
        minutes: '00',
        seconds: '00'
      };

      return;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor(
      (totalSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    this.countdown = {
      days: String(days).padStart(3, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0')
    };
  }

  submitRsvp(): void {
    this.submitted = true;

    console.log('RSVP:', this.rsvp);
  }
}
