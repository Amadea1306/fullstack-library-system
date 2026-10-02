import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookStatusBadge } from './book-status-badge';

describe('BookStatusBadge', () => {
  let component: BookStatusBadge;
  let fixture: ComponentFixture<BookStatusBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookStatusBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(BookStatusBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
