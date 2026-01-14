import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bookcard',
  imports: [],
  templateUrl: './bookcard.component.html',
  styleUrl: './bookcard.component.css'
})
export class BookcardComponent {
  @Input() book: any;
}
