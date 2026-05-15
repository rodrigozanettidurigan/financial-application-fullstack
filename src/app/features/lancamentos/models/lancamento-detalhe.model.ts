import { TipoLancamento } from './lancamento-request.model';

export interface LancamentoDetalhe {
  codigo: number;
  tipo: TipoLancamento;
  dataVencimento: string;
  dataPagamento?: string | null;
  descricao: string;
  valor: number;
  observacao?: string | null;
  categoria: {
    codigo: number;
    nome: string;
  };
  pessoa: {
    codigo: number;
    nome: string;
    ativo: boolean;
  };
}