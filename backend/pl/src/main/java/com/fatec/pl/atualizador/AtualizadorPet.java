package com.fatec.pl.atualizador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fatec.pl.modelo.Pet;
import com.fatec.pl.verificador.VerificadorStringNula;

@Component
public class AtualizadorPet implements Atualizador<Pet> {
    @Autowired
    private VerificadorStringNula verificadorString;

    @Override
    public void atualizar(Pet alvo, Pet atualizacao) {
        if (!verificadorString.verificar(atualizacao.getNome())) {
            alvo.setNome(atualizacao.getNome());
        }
        
        if (!verificadorString.verificar(atualizacao.getTipo())) {
            alvo.setTipo(atualizacao.getTipo());
        }
        
        if (!verificadorString.verificar(atualizacao.getRaca())) {
            alvo.setRaca(atualizacao.getRaca());
        }
        
        if (!verificadorString.verificar(atualizacao.getGenero())) {
            alvo.setGenero(atualizacao.getGenero());
        }
        
        // Atualiza o CPF do dono apenas se não for nulo e for diferente
        if (!verificadorString.verificar(atualizacao.getCpfDono()) && 
            !atualizacao.getCpfDono().equals(alvo.getCpfDono())) {
            alvo.setCpfDono(atualizacao.getCpfDono());
        }
    }
}