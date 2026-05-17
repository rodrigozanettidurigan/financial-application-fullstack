export type TipoLancamento = 'RECEITA' | 'DESPESA';
//REPRESENTA O JSON QUE O ANGULAR VAI ENVIAR PARA O SPRING
export interface LancamentoRequest {
  tipo: TipoLancamento;
  dataVencimento: string;
  dataPagamento?: string | null;
  descricao: string;
  valor: number;
  observacao?: string | null;
  categoria: {
    codigo: number;
  };
  pessoa: {
    codigo: number;
  };
}