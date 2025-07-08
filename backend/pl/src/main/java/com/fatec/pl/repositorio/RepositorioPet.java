package com.fatec.pl.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.pl.modelo.Pet;

public interface RepositorioPet extends JpaRepository<Pet, Long> {
    
    // Método para buscar pets por CPF do dono
    List<Pet> findByCpfDono(String cpfDono);
    
    // Método para verificar existência por CPF do dono
    boolean existsByCpfDono(String cpfDono);
}