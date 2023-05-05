import { Entidade } from "../entidade/Entidade";
import { Menu } from "./Menu";

export class MenuOperacoes{
  
  menu:Menu;

  constructor(menu:Menu){
    this.menu = menu;
  }

  private temSubmenus(): boolean{
    return Object.prototype.hasOwnProperty.call(this.menu, "submenus");
  }

  toEntidade():Entidade{
    if(this.temSubmenus()){
      return {
        nome:this.menu.nome,
        colunas: this.menu.submenus?.map(submenu=>({
          nome:submenu.nome,
          nomeTabela:this.menu.nome
        })) || []
      };
    }
    else{
      return {
        nome:this.menu.nome,
        nomeTabela:this.menu.nomePai || ''
      };
    }
  }



}