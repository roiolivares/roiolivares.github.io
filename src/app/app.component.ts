import { Component } from '@angular/core';
import { triggerAsyncId } from 'node:async_hooks';
import { Book } from './models/book';
import { FirebasedbService } from './services/firebasedb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public books: Book[];
  public bookDetails: Book;
  public protagonist1: string;
  public protagonist2: string;
  public protagonist3: string;
  public protagonistFilter: string;

  constructor(private firebd: FirebasedbService) {
    this.firebd.getBooks().subscribe(
      (originalBooks: Book[]) => {
        this.books = originalBooks;
      }
    );
    this.bookDetails = new Book();
  }

  seeDetails(i: number) {
    // Guardem el objecte
    this.bookDetails = this.books[i];
  }

  deleteBook(i: number) {
    this.firebd.deleteBook(this.books[i].id);
  }

  updateBook(i: number) {
    this.books[i].protagonists.push("oli");
    this.firebd.updateBook(this.books[i].id, this.books[i]);
  }


  clearBook() {
    this.bookDetails = new Book();
  }

  saveBook() {
    if (this.protagonist1 != null) {
      this.bookDetails.protagonists.push(this.protagonist1);
    }
    if (this.protagonist2 != null) {
      this.bookDetails.protagonists.push(this.protagonist2);
    }
    if (this.protagonist3 != null) {
      this.bookDetails.protagonists.push(this.protagonist3);
    }
    
    this.firebd.addBook(this.bookDetails);
  }

  searchBooksByProtagonist() {
    this.firebd.searchBooksByProtagonist(this.protagonistFilter).subscribe(
      (queryBooks: Book[]) => {
        this.books = queryBooks;
      }
    );;
  }

}
