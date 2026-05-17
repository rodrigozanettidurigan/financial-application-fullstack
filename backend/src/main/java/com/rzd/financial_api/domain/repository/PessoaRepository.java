package com.rzd.financial_api.domain.repository;

import com.rzd.financial_api.domain.entity.Pessoa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PessoaRepository  extends JpaRepository<Pessoa,Long> {

    Page<Pessoa> findByNomeContainingIgnoreCase(String nome, Pageable pageable);

}
