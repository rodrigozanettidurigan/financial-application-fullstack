package com.rzd.financial_api.application.service;

import com.rzd.financial_api.domain.entity.Pessoa;
import com.rzd.financial_api.domain.repository.PessoaRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class PessoaService {
    @Autowired
    private PessoaRepository pessoaRepository;


    public Pessoa atualizar(Long codigo, Pessoa pessoa) {
        Optional<Pessoa> pessoaSalva = buscarPessoaPeloCodigo(codigo);
        Pessoa entidade = pessoaSalva.get();
        BeanUtils.copyProperties(pessoa, entidade,"codigo");
        return pessoaRepository.save(entidade);
    }


    public void atualizarPropriedadeAtivo(@PathVariable Long codigo, @RequestBody Boolean ativo) {
        Optional<Pessoa> pessoaSalva = buscarPessoaPeloCodigo(codigo);
        Pessoa entidade = pessoaSalva.get();
        entidade.setAtivo(ativo);
        pessoaRepository.save(entidade);

    }
    private @NonNull Optional<Pessoa> buscarPessoaPeloCodigo(Long codigo) {
        Optional<Pessoa> pessoaSalva = pessoaRepository.findById(codigo);
        if(pessoaSalva .isEmpty()) {                   //Esperava pelo menos 1 mas foi encontrado 0
            throw new EmptyResultDataAccessException(1);
        }
        return pessoaSalva;
    }
}
