import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProtractorExpectedConditions } from 'protractor';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class FirebasedbService {

  constructor(private firestore: AngularFirestore) { }

  // Ens retorna un observable de Books
  getBooks(): Observable<Book[]> {
    // Ens fa un retrieve dels valors de la base de dades
    return this.firestore.collection<Book>("books").valueChanges({idField: 'id'});
  }

  addBook(book: Book) {
    this.firestore.collection("books").add({
      name: book.name,
      image: book.image,
      type: book.type,
      protagonists: book.protagonists
    })
  }

  deleteBook(id: string) {
    this.firestore.collection<Book>("Books").doc(id).delete();
  }

  updateBook(id: string, book: Book) {
    this.firestore.collection<Book>("Books").doc(id).update(book);
  }

  searchBooksByProtagonist(protagonist: string):Observable<Book[]> {
    return this.firestore.collection<Book>("books", ref => this.queryByProtagonist(protagonist, ref)).valueChanges();
  }

  private queryByProtagonist(protagonist: string, ref: any) {
    return ref.where("protagonists", "array-contains", [protagonist]);
  }
}
function protagonist(protagonist: string, ref: any) {
  return ref.where("protagonists", "array-contains-any", [protagonist])
}

