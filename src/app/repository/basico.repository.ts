import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Tabela } from "../modelo/Tabela";
import { TempoUtil } from "../util/tempo.util";

@Injectable({
  providedIn:'root'
})
export class BasicoRepository{

  get tabelasObs():Observable<Tabela[]>{

    const t = TempoUtil.time();
    console.log("BasicoRepository get tabelasObs inicio");
    TempoUtil.sleep(15000);
    console.log(`BasicoRepository get tabelasObs fim duracao: ${TempoUtil.time()-t}`);
    return of([
      {
        nome:"tabela1",
        colunas:[
          {nome:"coluna11",nomeTabela:"tabela1"},
          {nome:"coluna12",nomeTabela:"tabela1"} 
        ]
      },
      {
        nome:"tabela2",
        colunas:[
          {nome:"coluna21",nomeTabela:"tabela2"},
          {nome:"coluna22",nomeTabela:"tabela2"}
        ]
      }
    ]);
  }

}