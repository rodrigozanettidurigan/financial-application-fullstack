package com.rzd.financial_api.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data

@Entity
@Table(name= "pessoa")
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @NotNull
    private String nome;

    @Embedded
    private Endereco endereco;

    @NotNull
    boolean ativo;

    @JsonIgnore
    @Transient // campo para nao ser persistido no banco
    public boolean isInativo() {
        return !this.ativo;
    }
}
