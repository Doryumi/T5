package com.fatec.pl.controle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.pl.atualizador.AtualizadorPet;
import com.fatec.pl.hateoas.HateoasPet;
import com.fatec.pl.modelo.Pet;
import com.fatec.pl.repositorio.RepositorioPet;

@CrossOrigin
@RestController
public class ControlePet {
    @Autowired
    private RepositorioPet repositorio;
    
    @Autowired
    private HateoasPet hateoas;
    
    @Autowired
    private AtualizadorPet atualizador;

    @GetMapping("/pet/{id}")
    public ResponseEntity<Pet> obterPet(@PathVariable Long id) {
        Pet pet = repositorio.findById(id).orElse(null);
        if (pet != null) {
            hateoas.adicionarLink(pet);
            return new ResponseEntity<Pet>(pet, HttpStatus.FOUND);
        } else {
            return new ResponseEntity<Pet>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/pet/pets")
    public ResponseEntity<List<Pet>> obterPets() {
        List<Pet> pets = repositorio.findAll();
        hateoas.adicionarLink(pets);
        return new ResponseEntity<List<Pet>>(pets, HttpStatus.FOUND);
    }

    @GetMapping("/pet/cliente/{cpfDono}")
    public ResponseEntity<List<Pet>> obterPetsPorDono(@PathVariable String cpfDono) {
        List<Pet> pets = repositorio.findByCpfDono(cpfDono);
        hateoas.adicionarLink(pets);
        return new ResponseEntity<List<Pet>>(pets, HttpStatus.FOUND);
    }

    @PutMapping("/pet/atualizar")
    public ResponseEntity<?> atualizarPet(@RequestBody Pet atualizacao) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        Pet pet = repositorio.findById(atualizacao.getId()).orElse(null);
        if (pet != null) {
            atualizador.atualizar(pet, atualizacao);
            repositorio.save(pet);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(status);
    }

    @PostMapping("/pet/cadastrar")
    public ResponseEntity<?> cadastrarPet(@RequestBody Pet novo) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        if (novo != null) {
            repositorio.save(novo);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(status);
    }

    @DeleteMapping("/pet/excluir")
    public ResponseEntity<?> excluirPet(@RequestBody Pet exclusao) {
        Pet pet = repositorio.findById(exclusao.getId()).orElse(null);
        if (pet == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            repositorio.delete(pet);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}