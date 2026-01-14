export interface Book {
  id: string;
  title: string;
  authors: string[];
  author?: string;
  coverUrl: string;
  description?: string;
  publishedDate?: string;
  publisher?: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  previewLink?: string;
}

export interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items: GoogleBookVolume[];
}

export interface GoogleBookVolume {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
    };
    previewLink?: string;
    infoLink?: string;
  };
};