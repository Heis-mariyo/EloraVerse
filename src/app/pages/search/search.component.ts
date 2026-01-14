import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.services';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  bookService = inject(BookService);
  
  searchQuery = '';
  searchResults: any[] = [];

  ngOnInit(): void {
    // Initialize search page
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    
    if (this.searchQuery.length > 0) {
      // Call book service to search
      // this.bookService.searchBooks(this.searchQuery).subscribe(...)
      // For now, using mock data
      this.searchResults = [
        { id: 1, title: 'Sample Book 1', author: 'Author 1' },
        { id: 2, title: 'Sample Book 2', author: 'Author 2' },
        { id: 3, title: 'Sample Book 3', author: 'Author 3' }
      ];
    } else {
      this.searchResults = [];
    }
  }
}
