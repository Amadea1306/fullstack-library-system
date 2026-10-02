import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { BookStatusBadge } from '../book-status-badge/book-status-badge';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, BookStatusBadge],
  templateUrl: './book-card.html',
  styles: [
    `
      .card {
        border: 1px solid #ddd;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 12px;
        background: #fff;
      }
      .card-actions {
        margin-top: 12px;
        display: flex;
        gap: 8px;
      }
      .btn {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .btn-edit {
        background: #0d6efd;
        color: white;
      }
      .btn-toggle {
        background: #ffc107;
        color: black;
      }
      .btn-delete {
        background: #dc3545;
        color: white;
      }
    `,
  ],
})
export class BookCard {
  @Input({ required: true }) book!: Book;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() toggleStatus = new EventEmitter<Book>();

  onEdit(): void {
    this.edit.emit(this.book.id);
  }

  onDelete(): void {
    this.delete.emit(this.book.id);
  }

  onToggle(): void {
    this.toggleStatus.emit(this.book);
  }
}
