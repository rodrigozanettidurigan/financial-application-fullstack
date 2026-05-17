package com.rzd.financial_api.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rzd.financial_api.domain.entity.Categoria;
import org.springframework.stereotype.Repository;

@Repository
//Long é o tipo da chave primária da categoria
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
