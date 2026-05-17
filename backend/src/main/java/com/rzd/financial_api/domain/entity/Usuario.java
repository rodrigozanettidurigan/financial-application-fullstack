package com.rzd.financial_api.domain.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)

@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @EqualsAndHashCode.Include
    private Long codigo;

    private String nome;
    private String email;
    private String senha;
    //Um usuario pode ter muitas permissoes, e uma permissao pode ter muitos usuarios
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuario_permissao", joinColumns = @JoinColumn(name = "codigo_usuario")
    , inverseJoinColumns = @JoinColumn(name = "codigo_permissao"))
    private List<Permissao> permissoes;
}
