export type TipoLancamento = 'RECEITA' | 'DESPESA';


export interface LancamentoResumo {
  codigo: number;
  descricao: string;
  dataVencimento: string;
  dataPagamento?: string | null;
  valor: number;
  tipo: TipoLancamento;
  categoria: string;
  pessoa: string;
}