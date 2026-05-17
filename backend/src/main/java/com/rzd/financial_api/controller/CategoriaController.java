package com.rzd.financial_api.controller;

import java.util.List;
import java.util.Optional;
import com.rzd.financial_api.event.RecursoCriadoEvent;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.rzd.financial_api.domain.entity.Categoria;
import com.rzd.financial_api.domain.repository.CategoriaRepository;


@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaRepository categoriaRepository;
    @Autowired
    public CategoriaController(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    @GetMapping
    public List<Categoria> listar() {

        return categoriaRepository.findAll();
    }
    @Autowired
    private ApplicationEventPublisher publisher;

    @PreAuthorize("hasAuthority('ROLE_CADASTRAR_CATEGORIA')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) //@Valid valida regras de negocio @NotNull
    public ResponseEntity<Categoria> criar(@Valid @RequestBody Categoria categoria, HttpServletResponse response) {//Vicula uma requisicao HTTP ao objeto
        Categoria categoriaSalva =  categoriaRepository.save(categoria);

        publisher.publishEvent(new RecursoCriadoEvent(this,response, categoriaSalva.getCodigo()));
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaSalva);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<Categoria> buscarPeloCodigo(@PathVariable  Long codigo) {
       Optional<Categoria> categoria = categoriaRepository.findById(codigo);
       //O optional esta cheio?
       return categoria.isPresent() ? ResponseEntity.ok(categoria.get()) : ResponseEntity.notFound().build(); //.build() é usado porque não há um corpo (objeto) para enviar de volta,
                                                                                                                // apenas o status.
                     //Se sim faca o seguinte                   //Caso contrario (se tiver vazio)
    }
}
