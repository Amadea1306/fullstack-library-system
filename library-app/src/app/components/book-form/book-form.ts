import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './book-form.html',
  styles: [
    `
      .form-container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
      }
      .form-group {
        margin-bottom: 15px;
      }
      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .form-control {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
      }
      .error-text {
        color: red;
        font-size: 0.85rem;
        margin-top: 4px;
      }
    `,
  ],
})
export class BookForm implements OnInit {
  bookForm!: FormGroup;
  isEditMode: boolean = false;
  bookId?: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.required]],
      isbn: ['', [Validators.required, Validators.pattern('^(97(8|9))?\\d{9}(\\d|X)$')]],
      category: ['Fiction', [Validators.required]],
      publishedYear: [' ', [Validators.required, Validators.min(1000), Validators.max(2030)]],
      available: [true],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.bookId = +idParam;
      this.bookService.getBookById(this.bookId).subscribe((book) => {
        this.bookForm.patchValue(book);
      });
    }
  }

  get f() {
    return this.bookForm.controls;
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.bookId) {
      this.bookService.updateBook(this.bookId, this.bookForm.value).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.addBook(this.bookForm.value).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }
}
