import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../model/book.type';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  bookService = inject(BookService);
  
  searchQuery = '';
  searchResults: Book[] = [];
  isLoading = false;
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    // Debounce search input
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.searchSubject.next(this.searchQuery);
  }

  private performSearch(query: string): void {
    if (query.length === 0) {
      this.searchResults = [];
      return;
    }

    this.isLoading = true;
    this.bookService.searchBooks(query, 20).subscribe({
      next: (books) => {
        this.searchResults = books;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.searchResults = [];
        this.isLoading = false;
      }
    });
  }
}
