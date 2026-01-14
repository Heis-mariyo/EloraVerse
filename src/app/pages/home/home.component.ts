import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.services';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  bookService = inject(BookService);
  
  trendingBooks = [
    { id: 1, title: 'The Midnight Library', author: 'Matt Haig' },
    { id: 2, title: 'Lessons in Chemistry', author: 'Bonnie Garmus' },
    { id: 3, title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin' },
    { id: 4, title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid' },
    { id: 5, title: 'Circe', author: 'Madeline Miller' },
    { id: 6, title: 'Project Hail Mary', author: 'Andy Weir' }
  ];

  ngOnInit(): void {
    // Initialize home page
  }
}
