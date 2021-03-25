import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProtractorExpectedConditions } from 'protractor';
import { Observable } from 'rxjs';
import { Materia } from '../models/materia';

@Injectable({
  providedIn: 'root'
})
export class FirebasedbService {
  [x: string]: any;

  constructor(private firestore: AngularFirestore) { }

  chechAllowedUser(email: string): Observable<any[]> {
    return this.firestore.collection("allowed_users", ref => this.queryByEmail(email, ref)).valueChanges();
  }

  private queryByEmail(email: string, ref: any) {
    return ref.where("email", "==", email);
  }

  // Ens retorna un observable de Materies
  getMateries(): Observable<Materia[]> {
    // Ens fa un retrieve dels valors de la base de dades
    return this.firestore.collection<Materia>("materies").valueChanges({idField: 'id'});
  }

  addMateria(materia: Materia) {
    this.firestore.collection("materies").add({
      nomMateria: materia.nomMateria,
      unitatFormativa: materia.unitatFormativa,
      practica: materia.practica
    })
  }

  deleteMateria(id: string) {
    this.firestore.collection<Materia>("materies").doc(id).delete();
  }

  searchMateriesByPractica(practica: string):Observable<Materia[]> {
    return this.firestore.collection<Materia>("materies", ref => this.queryByPractica(practica, ref)).valueChanges();
  }

  private queryByPractica(practica: string, ref: any) {
    return ref.where("practiques", "array-contains", [practica]);
  }
}
function practica(practica: string, ref: any) {
  return ref.where("practiques", "array-contains-any", [practica])
}



