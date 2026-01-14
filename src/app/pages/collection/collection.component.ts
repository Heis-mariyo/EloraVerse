import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../model/book.type';

@Component({
  selector: 'app-collection',
  imports: [CommonModule, RouterLink],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  bookService = inject(BookService);
  
  savedBooks: Book[] = [];

  ngOnInit(): void {
    // Load saved books from service or localStorage
    this.loadSavedBooks();
  }

  loadSavedBooks(): void {
    // Mock data for now - in production, load from localStorage or backend
    const mockSavedBooks: Book[] = [];
    this.savedBooks = mockSavedBooks;
    // In production: 
    // const saved = localStorage.getItem('savedBooks');
    // this.savedBooks = saved ? JSON.parse(saved) : [];
  }

  removeFromCollection(bookId: string): void {
    this.savedBooks = this.savedBooks.filter(book => book.id !== bookId);
    // Save to localStorage
    // localStorage.setItem('savedBooks', JSON.stringify(this.savedBooks));
  }
}
