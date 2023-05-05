import {Component,Input,OnChanges,OnInit,SimpleChanges} from '@angular/core';
import { Entidade } from '../../modelo/Entidade';

@Component({
  selector: 'app-exibir',
  templateUrl: './exibir.component.html',
  styleUrls: ['./exibir.component.css'],
})
export class ExibirComponent implements OnInit, OnChanges {

  @Input() public entidade!: Entidade;

  constructor() {
    console.log('ExibirComponent contrutor inicio');

    console.log('ExibirComponent contrutor fim');
  }

  ngOnInit(): void {
    console.log('ExibirComponent ngOnInit inicio');
    console.log("-----------------------------------------------------");
    console.log(`ExibirComponent testar = ${this.entidade!=undefined}`);
    console.log("-----------------------------------------------------");
    console.log('ExibirComponent ngOnInit fim');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ExibirComponent ngOnChanges testar inicio');
    console.log("-----------------------------------------------------");
    console.log(`ExibirComponent testar = ${this.entidade!=undefined}`);
    console.log("-----------------------------------------------------");
    console.log('ExibirComponent ngOnChanges testar fim');
  }

}
