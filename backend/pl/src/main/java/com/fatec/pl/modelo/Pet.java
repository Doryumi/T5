package com.fatec.pl.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import org.springframework.hateoas.RepresentationModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Pet extends RepresentationModel<Pet> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
    
    @Column(nullable = false)
    private String tipo;
    
    @Column(nullable = false)
    private String raca;
    
    @Column(nullable = false)
    private String genero;
    
    // Relacionamento com Cliente via CPF
    @Column(nullable = false)
    private String cpfDono;
    
    // Opcional: Relacionamento bidirecional (descomente se necessário)
    /*
    @ManyToOne
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    private Cliente dono;
    */
}