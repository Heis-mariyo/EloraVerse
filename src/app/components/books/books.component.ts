import { Component, OnInit, inject, signal } from '@angular/core';
import { catchError } from 'rxjs';
import { BookService } from '../../services/book.services';

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  providers: [BookService]
})
export class BooksComponent implements OnInit {
  bookService = inject(BookService);
  book = signal<any[]>([]);

  ngOnInit(): void {
    this.bookService.getBooksFromApi()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err; 
        })
      ).subscribe((books) => {
        this.book.set(books);
      })
  }
}
