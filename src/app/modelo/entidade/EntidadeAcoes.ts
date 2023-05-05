import { Menu } from "../menu/Menu";
import { Coluna } from "./Coluna";
import { Entidade } from "./Entidade";
import { Tabela } from "./Tabela";

export class EntidadeAcoes{

  entidade:Entidade;

  constructor(entidade:Entidade){
    this.entidade = entidade;
  }

  isTabela(): boolean {
    return Object.prototype.hasOwnProperty.call(this.entidade, "colunas");
  }

  toMenu():Menu{
    if(this.isTabela()){
      return {
        nome:this.entidade.nome,
        submenus: (this.entidade as Tabela).colunas.map(c=>
            ({nome:c.nome,nomePai:this.entidade.nome})
        )
      };
    }
    else{
      return {
        nome:this.entidade.nome,
        nomePai:(this.entidade as Coluna).nomeTabela
      };
    }
  }

}