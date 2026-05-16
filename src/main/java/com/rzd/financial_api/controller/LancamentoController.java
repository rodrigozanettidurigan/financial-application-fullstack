package com.rzd.financial_api.controller;

import com.rzd.financial_api.application.exception.PessoaInexistenteOuInativaException;
import com.rzd.financial_api.application.service.LancamentoService;
import com.rzd.financial_api.domain.entity.Lancamento;
import com.rzd.financial_api.domain.repository.LancamentoRepository;
import com.rzd.financial_api.domain.repository.filter.LancamentoFilter;
import com.rzd.financial_api.domain.repository.projection.ResumoLancamento;
import com.rzd.financial_api.event.RecursoCriadoEvent;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/lancamentos")
public class LancamentoController {

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private LancamentoService lancamentoService;


    private final LancamentoRepository lancamentoRepository;
    private final ApplicationEventPublisher publisher;

    public LancamentoController(LancamentoRepository lancamentoRepository, ApplicationEventPublisher publisher) {
        this.lancamentoRepository = lancamentoRepository;
        this.publisher = publisher;
    }


    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO')")
    @GetMapping(params = "resumo")
    public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable) {

        return lancamentoRepository.resumir(lancamentoFilter, pageable);
    }

    @PreAuthorize("hasAuthority('ROLE_CADASTRAR_LANCAMENTO')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Lancamento> criar(@Valid @RequestBody Lancamento lancamento, HttpServletResponse response) {
        Lancamento lancamentoSalvo = lancamentoService.salvar(lancamento);

        publisher.publishEvent(new RecursoCriadoEvent(this,response, lancamentoSalvo.getCodigo()));
        return ResponseEntity.status(HttpStatus.CREATED).body(lancamentoSalvo);
    }
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO')")
    @GetMapping("/{codigo}")
    public ResponseEntity<Lancamento> buscarPeloCodigo(@PathVariable Long codigo) {
        return lancamentoRepository.findById(codigo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @ExceptionHandler({ PessoaInexistenteOuInativaException.class })
    public ResponseEntity<Object> handlePessoaInexistenteOuInativaException(PessoaInexistenteOuInativaException ex) {
        String mensagemUsuario = messageSource.getMessage("pessoa.inexistente-ou-inativa", null, LocaleContextHolder.getLocale());
        String mensagemDesenvolvedor = ex.toString();
        List<com.rzd.financial_api.domain.exceptionhandler.ExceptionHandler.Erro> erros = Arrays.asList(new com.rzd.financial_api.domain.exceptionhandler.ExceptionHandler.Erro(mensagemUsuario, mensagemDesenvolvedor));
        return ResponseEntity.badRequest().body(erros);
    }
    @PreAuthorize("hasAuthority('ROLE_REMOVER_LANCAMENTO')")
    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo) {
        lancamentoRepository.deleteById(codigo);
    }
}
