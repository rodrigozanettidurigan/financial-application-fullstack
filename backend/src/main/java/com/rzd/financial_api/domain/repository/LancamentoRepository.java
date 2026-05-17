package com.rzd.financial_api.domain.repository;

import com.rzd.financial_api.domain.entity.Lancamento;
import com.rzd.financial_api.domain.repository.lancamento.LancamentoRepositoryQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LancamentoRepository extends JpaRepository<Lancamento, Long>, LancamentoRepositoryQuery {

}
