import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { BookCard } from '../book-card/book-card';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, BookCard],
  templateUrl: './book-list.html',
  styles: [
    `
      .toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .filter-btn {
        margin-right: 5px;
        padding: 6px 12px;
        cursor: pointer;
      }
      .active-filter {
        background: #0d6efd;
        color: white;
      }
    `,
  ],
})
export class BookList implements OnInit, OnDestroy {
  books: Book[] = [];
  currentCategory: string = 'ALL';
  private subscription?: Subscription; // Feature 10: RxJS Subscription management

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentCategory = params['category'] || 'ALL';
      this.fetchBooks();
    });
  }

  fetchBooks(): void {
    this.subscription = this.bookService.getBooks(this.currentCategory).subscribe({
      next: (data) => (this.books = data),
      error: (err) => console.error('Failed to load books', err),
    });
  }

  filterByCategory(cat: string): void {
    this.router.navigate(['/books'], { queryParams: { category: cat } });
  }

  navigateToAddBook(): void {
    this.router.navigate(['/books', 'new']);
  }

  handleEdit(id: number): void {
    this.router.navigate(['/books', 'edit', id]);
  }

  handleDelete(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => this.fetchBooks());
    }
  }

  handleToggle(book: Book): void {
    const updatedBook = { ...book, available: !book.available };
    this.bookService.updateBook(book.id!, updatedBook).subscribe(() => this.fetchBooks());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
