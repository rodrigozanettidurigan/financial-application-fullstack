package com.rzd.financial_api.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;

@Data

@Entity
@Table
public class Permissao {

    @Id
    private Long codigo;
    private String descricao;
}
