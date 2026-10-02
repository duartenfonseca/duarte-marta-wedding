import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  submitted = false;

  rsvp = {
    name: '',
    attendance: 'yes',
    guests: 1,
    message: ''
  };

  submitRsvp(): void {
    this.submitted = true;
    console.log('RSVP:', this.rsvp);
  }
}
