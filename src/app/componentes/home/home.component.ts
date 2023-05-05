import { Component, OnInit } from '@angular/core';
import { Entidade } from '../../modelo/entidade/Entidade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  entidade!: Entidade;

  constructor() {
    console.log('HomeComponent contrutor inicio');

    console.log('HomeComponent contrutor fim');
  }

  ngOnInit(): void {
    console.log('HomeComponent ngOnInit inicio');

    console.log('HomeComponent ngOnInit fim');
  }

  public tratarMenu(entidade: Entidade) {
    console.log("-----------------------------------------------------");
    console.log('HomeComponent tratarMenu inicio');
    this.entidade = entidade;
    console.log('HomeComponent tratarMenu fim');
    console.log("-----------------------------------------------------");
  }
}
