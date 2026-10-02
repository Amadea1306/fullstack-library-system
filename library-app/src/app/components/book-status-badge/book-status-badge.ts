import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [ngClass]="available ? 'badge-available' : 'badge-borrowed'"
      [ngStyle]="{ 'font-size': '0.85rem', padding: '4px 8px', 'border-radius': '4px' }"
    >
      {{ available ? 'AVAILABLE' : 'BORROWED' }}
    </span>
  `,
  styles: [
    `
      .badge-available {
        background-color: #d1e7dd;
        color: #0f5132;
      }
      .badge-borrowed {
        background-color: #f8d7da;
        color: #842029;
      }
    `,
  ],
})
export class BookStatusBadge {
  @Input({ required: true }) available: boolean = true;
}
