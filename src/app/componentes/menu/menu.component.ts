import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BasicoRepository } from "../../repository/basico.repository";
import { Tabela } from "../../modelo/Tabela";
import { TempoUtil } from "../../util/tempo.util";
import { Menu } from "../../modelo/Menu";
import { Entidade } from "../../modelo/Entidade";

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
  indiceNoPadraoPai = 0;
  indiceNoPadraoFilho = 0;
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
      this.dataSource.data = this.tabelas.map(t=>this.entidadeToMenu(t));
      this.ativarPadrao();
    });
    console.log("MenuComponent contrutor fim");
  }

  private isTabela(entidade: Entidade): entidade is Tabela {
    return Object.prototype.hasOwnProperty.call(entidade, "colunas");
  }

  private temSubmenus(menu: Menu): boolean{
    return Object.prototype.hasOwnProperty.call(menu, "submenus");
  }

  entidadeToMenu(entidade:Entidade):Menu{
    if(this.isTabela(entidade)){
      return {
        nome:entidade.nome,
        submenus: entidade.colunas.map(c=>
            ({nome:c.nome,nomePai:entidade.nome})
        )
      };
    }
    else{
      return {
        nome:entidade.nome,
        nomePai:entidade.nomeTabela
      };
    }
  }

  menuToEntidade(menu:Menu):Entidade{
    if(this.temSubmenus(menu)){
      return {
        nome:menu.nome,
        colunas: menu.submenus?.map(submenu=>({
          nome:submenu.nome,
          nomeTabela:menu.nome
        })) || []
      };
    }
    else{
      return {
        nome:menu.nome,
        nomeTabela:menu.nomePai || ''
      };
    }
  }
  
  ngOnInit(): void {
    console.log("MenuComponent ngOnInit inicio");
    this.ativarPadrao();
    console.log("MenuComponent ngOnInit fim");
  }

  ativarPadrao(){
    const t = TempoUtil.time();
    console.log("MenuComponent ativarPadrao inicio");
    const noPadraoFilho = this.treeControl.dataNodes[this.indiceNoPadraoFilho];
    this.ativar(noPadraoFilho);
    const noPadraoPai = this.treeControl.dataNodes[this.indiceNoPadraoPai];
    this.treeControl.expand(noPadraoPai);     
    console.log(`MenuComponent ativarPadrao fim duracao: ${TempoUtil.time()-t}`);
  }

  ativar(node:Menu){
    console.log("MenuComponent ativar inicio");
    this.menuAcionadoEvt.emit(this.menuToEntidade(node));
    this.activeNode = node;
    console.log("MenuComponent ativar fim");
  }
/*
  gerarEntidade(menu:Menu):Observable<Entidade>{
    return this.basicoRepository.tabelasObs;
  }
  */

}