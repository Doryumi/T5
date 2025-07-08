package com.fatec.pl.hateoas;

import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;

import com.fatec.pl.controle.ControlePet;
import com.fatec.pl.modelo.Pet;

@Component
public class HateoasPet implements Hateoas<Pet> {

    @Override
    public void adicionarLink(List<Pet> lista) {
        for (Pet pet : lista) {
            long id = pet.getId();
            Link linkProprio = WebMvcLinkBuilder
                    .linkTo(WebMvcLinkBuilder.methodOn(ControlePet.class).obterPet(id))
                    .withSelfRel();
            pet.add(linkProprio);
            
            // Link para o dono do pet (cliente)
            Link linkDono = WebMvcLinkBuilder
                    .linkTo(WebMvcLinkBuilder.methodOn(ControleCliente.class)
                    .obterCliente(pet.getCpfDono())) // ou getIdDono() se usar relacionamento JPA
                    .withRel("dono");
            pet.add(linkDono);
        }
    }

    @Override
    public void adicionarLink(Pet objeto) {
        Link linkProprio = WebMvcLinkBuilder
                .linkTo(WebMvcLinkBuilder.methodOn(ControlePet.class).obterPets())
                .withRel("pets");
        objeto.add(linkProprio);

        // Link para o dono do pet (cliente)
        Link linkDono = WebMvcLinkBuilder
                .linkTo(WebMvcLinkBuilder.methodOn(ControleCliente.class)
                .obterCliente(objeto.getCpfDono())) // ou getIdDono() se usar relacionamento JPA
                .withRel("dono");
        objeto.add(linkDono);
    }
}