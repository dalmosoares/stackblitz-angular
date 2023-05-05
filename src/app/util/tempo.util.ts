export class TempoUtil{

  public static sleep(duracao:number=3000):void{
    for(let n = new Date().getTime() + duracao;n-new Date().getTime()>0;){}
  }

  public static time():number{
    return new Date().getTime();
  }

}