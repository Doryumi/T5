import { useEffect, useState } from 'react'
import api from '../../api/api'
import clientes from '../listas/listaClientes'

const CadastroPet = ({tema, pet, clientes}) => {

    const [cpfTutor, setCpfTutor] = useState('')
    const [nome, setNome] = useState('')
    const [tipo, setTipo] = useState('')
    const [raca, setRaca] = useState('')
    const [genero, setGenero] = useState('')
    
    function adicionarPet(e) {
        e.preventDefault()

        if (!cpfTutor) {
            alert('Selecione o tutor do pet')
            return
        }

        const novoPet = {
            nome: nome,
            tipo: tipo,
            raca: raca,
            genero: genero,
            cpfTutor: cpfTutor
        }
    
        api.post('/pet' , (novoPet))
            .then(() => {
                console.log('Pet Cadastrado')
                setNome('')
                setTipo('')
                setRaca('')
                setGenero('')
                setCpfTutor('')
            })
            .catch((err) => console.error('Erro ao cadastrar Pet' , err))
    }


    useEffect(() => {
        if(pet) {
            setNome(pet.nome || '')
            setTipo(pet.tipo || '')
            setRaca(pet.raca || '')
            setGenero(pet.genero || '')
            setCpfTutor(pet.cpfTutor || '')
        }
    }, [pet])

    function atualizarPet(e) {
        e.preventDefault()
        const id = pet.id
        const petAtualizado = {
            id: pet.id,
            nome: nome,
            tipo: tipo,
            raca: raca,
            genero: genero,
            cpfTutor: cpfTutor
        }

        api.put(`pet/${id}` , (petAtualizado))
        .then(() => {
            console.log('pet Atualizado!')
        })
        .catch((err) => console.error('Erro ao atualizar pet', err))
    }

    return (
        <>
            <div className="container-fluid px-5">
                <form className="container-fluid px-5 py-4" onSubmit={pet ? atualizarPet : adicionarPet}>
                    <h1 className="pb-4">{pet ? 'Atualizar' : 'Cadastrar'} Pet</h1>

                                            <div className="input-group mb-3">
                    <select
                        className="form-control"
                        value={cpfTutor}
                        required
                        onChange={(e) => setCpfTutor(e.target.value)}
                        disabled={!!pet} // Desabilita se for edição
                    >
                        <option value="">Selecione o Tutor</option>
                        {clientes && clientes.map(cliente => (
                            <option key={cliente.cpf} value={cliente.cpf}>
                                {cliente.nome} - {cliente.cpf}
                            </option>
                        ))}
                    </select>
                </div>
                <br></br>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" value={nome} required onChange={(e) => setNome(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <input type="text" className="form-control" aria-label="Tipo" placeholder="Tipo" value={tipo} required onChange={(e) => setTipo(e.target.value)}/>
                            </div>

                            <div className="input-group mb-3">
                                <input type="text" className="form-control" aria-label="Raça" placeholder="Raça" value={raca} required onChange={(e) => setRaca(e.target.value)}/>
                            </div>

                            <div className="input-group mb-3">
                                <select className="form-control" aria-label="Gênero" placeholder="Tipo" value={genero} required onChange={(e) => setGenero(e.target.value)}>
                                    <option value="" disabled>Gênero</option>
                                    <option value="macho">Macho</option>
                                    <option value="femea">Fêmea</option>
                                </select>
                            </div>                
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>{pet ? 'Atualizar' : 'Cadastrar'}</button>
                    </div>

                </form>
            </div>
        </>
    )
}
 
export default CadastroPet