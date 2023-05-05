import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BasicoRepository } from "../../repository/basico.repository";
import { Tabela } from "../../modelo/entidade/Tabela";
import { TempoUtil } from "../../util/tempo.util";
import { Menu } from "../../modelo/menu/Menu";
import { Entidade } from "../../modelo/entidade/Entidade";
import { MenuOperacoes } from "../../modelo/menu/MenuOperacoes";
import { EntidadeOperacoes } from "../../modelo/entidade/EntidadeOperacoes";

type MenuMat = {
  nome: string;
  nomePai: string | undefined;
  expansivel: boolean;
  nivel: number;
};
type MenuApp = {
  nome: string;
  nomePai: string | undefined;
  expansivel: boolean;
  nivel: number;
};

type NoIndice = {
  pai:number;
  filho?:number;
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  private _transformer:((node: Menu, nivel: number) => MenuMat);
  treeControl: FlatTreeControl<MenuApp>;
  private treeFlattener: MatTreeFlattener<Menu,MenuMat,MenuMat>
  dataSource:MatTreeFlatDataSource<Menu,MenuMat,MenuMat>;
  hasChild:((_: number, node: MenuApp) => boolean);

  @Output() public menuAcionadoEvt = new EventEmitter<Entidade>();
  padding = 20;
  activeNode:any;
  noIndicePadrao:NoIndice={pai:0,filho:0};
  private tabelas:Tabela[] = [];

  constructor(private basicoRepository:BasicoRepository){
    console.log("MenuComponent contrutor inicio");
    this._transformer = (node: Menu, nivel: number) => {
      return {
        nome: node.nome,
        nomePai: node.nomePai,
        expansivel: !!node.submenus && node.submenus.length > 0,
        nivel: nivel
      };
    };
  
    this.treeControl = new FlatTreeControl<MenuApp>(
      node => node.nivel,
      node => node.expansivel
    );

    this.treeFlattener = new MatTreeFlattener(
      this._transformer,
      node => node.nivel,
      node => node.expansivel,
      node => node.submenus
    );

    this.hasChild = (_: number, node: MenuApp) => node.expansivel;
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.basicoRepository.tabelasObs.subscribe(tabelas=>{
      this.tabelas=tabelas;
      this.dataSource.data = this.tabelas.map(t=>new EntidadeOperacoes(t).toMenu());
      this.ativarPadrao();
    });
    console.log("MenuComponent contrutor fim");
  }
  
  ngOnInit(): void {
    console.log("MenuComponent ngOnInit inicio");
    this.ativarPadrao();
    console.log("MenuComponent ngOnInit fim");
  }

  ativarPadrao(){
    const t = TempoUtil.time();
    console.log("MenuComponent ativarPadrao inicio");
    const noPadraoPai = this.treeControl.dataNodes[this.noIndicePadrao.pai];
    this.treeControl.expand(noPadraoPai); 
    if(this.noIndicePadrao.filho!=undefined){
      const noPadraoFilho = this.treeControl.dataNodes[this.noIndicePadrao.filho];
      this.ativar(noPadraoFilho);
    }else{
      this.ativar(noPadraoPai);
    }
    console.log(`MenuComponent ativarPadrao fim duracao: ${TempoUtil.time()-t}`);
  }

  ativar(node:Menu){
    console.log("MenuComponent ativar inicio");
    this.menuAcionadoEvt.emit(new MenuOperacoes(node).toEntidade());
    this.activeNode = node;
    console.log("MenuComponent ativar fim");
  }
/*
  gerarEntidade(menu:Menu):Observable<Entidade>{
    return this.basicoRepository.tabelasObs;
  }
  */

}