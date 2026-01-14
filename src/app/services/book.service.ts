import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, of } from 'rxjs';
import { Book, GoogleBooksResponse, GoogleBookVolume } from '../model/book.type';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient);
  private readonly API_BASE = 'https://www.googleapis.com/books/v1/volumes';
  
  // Optional: Add your API key here for higher rate limits
  private readonly API_KEY = ''; // Leave empty for basic usage

  searchBooks(query: string, maxResults: number = 10): Observable<Book[]> {
    let params = new HttpParams()
      .set('q', query)
      .set('maxResults', maxResults.toString());
    
    if (this.API_KEY) {
      params = params.set('key', this.API_KEY);
    }

    return this.http.get<GoogleBooksResponse>(this.API_BASE, { params }).pipe(
      map(response => this.mapGoogleBooksToBooks(response)),
      catchError(error => {
        console.error('Error fetching books:', error);
        return of([]);
      })
    );
  }

  getTrendingBooks(maxResults: number = 10): Observable<Book[]> {
    // Get popular/trending books - using bestsellers or popular fiction
    const queries = ['bestseller', 'popular fiction', 'new releases'];
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    
    let params = new HttpParams()
      .set('q', randomQuery)
      .set('orderBy', 'newest')
      .set('maxResults', maxResults.toString());
    
    if (this.API_KEY) {
      params = params.set('key', this.API_KEY);
    }

    return this.http.get<GoogleBooksResponse>(this.API_BASE, { params }).pipe(
      map(response => this.mapGoogleBooksToBooks(response)),
      catchError(error => {
        console.error('Error fetching trending books:', error);
        return of([]);
      })
    );
  }

  getBookById(volumeId: string): Observable<Book | null> {
    let params = new HttpParams();
    if (this.API_KEY) {
      params = params.set('key', this.API_KEY);
    }

    return this.http.get<GoogleBookVolume>(`${this.API_BASE}/${volumeId}`, { params }).pipe(
      map(volume => this.mapSingleGoogleBookToBook(volume)),
      catchError(error => {
        console.error('Error fetching book:', error);
        return of(null);
      })
    );
  }

  private mapGoogleBooksToBooks(response: GoogleBooksResponse): Book[] {
    if (!response.items || response.items.length === 0) {
      return [];
    }

    return response.items.map(item => this.mapSingleGoogleBookToBook(item));
  }

  private mapSingleGoogleBookToBook(volume: GoogleBookVolume): Book {
    const info = volume.volumeInfo;
    return {
      id: volume.id,
      title: info.title || 'Unknown Title',
      authors: info.authors || ['Unknown Author'],
      author: info.authors?.join(', ') || 'Unknown Author',
      coverUrl: info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || 'assets/placeholder-book.png',
      description: info.description,
      publishedDate: info.publishedDate,
      publisher: info.publisher,
      pageCount: info.pageCount,
      categories: info.categories,
      averageRating: info.averageRating,
      previewLink: info.previewLink || info.infoLink
    };
  }
}