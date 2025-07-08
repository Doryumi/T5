import { useEffect, useState } from "react"
import api from '../../api/api'


const ListaPet = ({tema, seletorView}) => {
    const [pets, setPets] = useState([])
    const [mensagemErro , setMensagemErro] = useState(false)


    useEffect(() => {
        api.get('/pet')
            .then((res) => setPets(res.data))
            .catch((err) => console.error('Erro ao buscar pets: ', err))
    }, [])

    useEffect(() => {
        pets.length < 1
        ? setMensagemErro(true)
        : setMensagemErro(false)
    }, [pets.length])

    const deletar = (id) => {
        if(!window.confirm('Você deseja deletar esse Pet?')) return

        api.delete(`pet/${id}`)
            .then(() => {
                setPets((prev) => prev.filter((p) => p.id !== id))
            })
            .catch((err) => console.error('Erro ao excluir Pet', err))
    }

    return (
        <>
            <div className="mx-5 px-5 pt-4">
                <h1>Lista de Pets</h1>
            </div>

            {mensagemErro && (     
                <div className="px-5 mx-5 py-4">
                    <h2>Nada Registrado</h2>
                </div>
            )}
            
            {pets.map((pet) => (
                <div className="px-5 mx-5 ">
                    <table className="table table-striped align-middle">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Raça</th>
                                <th scope="col">Gênero</th>
                                <th scope="col">Tutor</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                    {pets.map((pet) => (
                        <tr key={pet.id}>
                            <td scope="row">{pet.id}</td>
                            <td>{pet.nome}</td>
                            <td>{pet.tipo}</td>
                            <td>{pet.raca}</td>
                            <td>{pet.genero}</td>
                            <td>{pet.tutor}</td>
                            <td style={{ width: '10px' }}>
                                <div className="d-flex gap-1">
                                    <button 
                                        className="btn btn-outline-secondary"
                                        onClick={(e) => seletorView('Cadastrar Pet', e, null, pet, null)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="btn btn-outline-danger"
                                        onClick={() => deletar(pet.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    )
}

export default ListaPet