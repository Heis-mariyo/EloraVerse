import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { BookService } from '../../services/book.service';
import { Book } from '../../model/book.type';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  bookService = inject(BookService);
  
  trendingBooks: Book[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadTrendingBooks();
  }

  loadTrendingBooks(): void {
    this.isLoading = true;
    this.bookService.getTrendingBooks(12).subscribe({
      next: (books) => {
        this.trendingBooks = books;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading trending books:', error);
        this.isLoading = false;
        // Fallback to mock data if API fails
        this.trendingBooks = this.getMockBooks();
      }
    });
  }

  private getMockBooks(): Book[] {
    return [
      { id: '1', title: 'The Midnight Library', authors: ['Matt Haig'], author: 'Matt Haig', coverUrl: '' },
      { id: '2', title: 'Lessons in Chemistry', authors: ['Bonnie Garmus'], author: 'Bonnie Garmus', coverUrl: '' },
      { id: '3', title: 'Tomorrow, and Tomorrow, and Tomorrow', authors: ['Gabrielle Zevin'], author: 'Gabrielle Zevin', coverUrl: '' },
      { id: '4', title: 'The Seven Husbands of Evelyn Hugo', authors: ['Taylor Jenkins Reid'], author: 'Taylor Jenkins Reid', coverUrl: '' },
      { id: '5', title: 'Circe', authors: ['Madeline Miller'], author: 'Madeline Miller', coverUrl: '' },
      { id: '6', title: 'Project Hail Mary', authors: ['Andy Weir'], author: 'Andy Weir', coverUrl: '' }
    ];
  }
}
