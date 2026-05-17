package com.rzd.financial_api.domain.repository.lancamento;

import com.rzd.financial_api.domain.entity.Lancamento;
import com.rzd.financial_api.domain.repository.filter.LancamentoFilter;
import com.rzd.financial_api.domain.repository.projection.ResumoLancamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LancamentoRepositoryQuery {

    public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);
    public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable);
}
