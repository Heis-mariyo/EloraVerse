import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.services';

@Component({
  selector: 'app-collection',
  imports: [CommonModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  bookService = inject(BookService);
  
  savedBooks: any[] = [];

  ngOnInit(): void {
    // Load saved books from service or localStorage
    this.loadSavedBooks();
  }

  loadSavedBooks(): void {
    // Mock data for now
    this.savedBooks = [
      { id: 1, title: 'The Midnight Library', author: 'Matt Haig', savedAt: new Date() },
      { id: 2, title: 'Lessons in Chemistry', author: 'Bonnie Garmus', savedAt: new Date() }
    ];
    // In production: this.bookService.getSavedBooks().subscribe(books => this.savedBooks = books);
  }

  removeFromCollection(bookId: number): void {
    this.savedBooks = this.savedBooks.filter(book => book.id !== bookId);
    // Call service to remove from backend: this.bookService.removeFromCollection(bookId).subscribe(...);
  }
}
