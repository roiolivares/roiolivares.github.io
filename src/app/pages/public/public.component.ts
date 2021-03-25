import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/models/materia';
import { FirebasedbService } from 'src/app/services/firebasedb.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  public materies: Materia[];
  public materiaDetails: Materia;
  public practica1: string;
  public practica2: string;
  public practica3: string;
  public practicaFilter: string;

  constructor(private firebd: FirebasedbService) {
    this.firebd.getMateries().subscribe(
      (originalMateries: Materia[]) => {
        this.materies = originalMateries;
      }
    );
    this.materiaDetails = new Materia();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  seeDetails(i: number) {
    // Guardem el objecte
    this.materiaDetails = this.materies[i];
  }

  deleteMateria(i: number) {
    this.firebd.deleteMateria(this.materies[i].id);
  }

  clearMateria() {
    this.materiaDetails = new Materia();
  }

  saveMateria() {
    if (this.practica1 != null) {
      this.materiaDetails.practica.push(this.practica1);
    }
    if (this.practica2 != null) {
      this.materiaDetails.practica.push(this.practica2);
    }
    if (this.practica3 != null) {
      this.materiaDetails.practica.push(this.practica3);
    }
    
    this.firebd.addMateria(this.materiaDetails);
  }

  searchMateriesByPractica() {
    this.firebd.searchMateriesByPractica(this.practicaFilter).subscribe(
      (queryMateries: Materia[]) => {
        this.materies = queryMateries;
      }
    );;
  }

}
