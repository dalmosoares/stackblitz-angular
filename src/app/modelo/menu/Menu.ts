export interface Menu{
  nome: string;
  nomePai?: string;
  submenus?: Menu[];
}