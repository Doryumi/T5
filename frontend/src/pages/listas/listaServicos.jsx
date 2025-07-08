import api from '../../api/api'
import { useEffect, useState } from 'react'

const ListaServico = ({tema, seletorView}) => {
    const [servicos, setServicos] = useState([])
    const [mensagemErro , setMensagemErro] = useState(false)

    useEffect(() => {
        api.get('/servico')
            .then((res) => setServicos(res.data))
            .catch((err) => console.error('Erro ao buscar Serciços: ', err))
    }, [])

    useEffect(() => {
        servicos.length < 1
        ? setMensagemErro(true)
        : setMensagemErro(false)
    }, [servicos.length])

    const deletar = (id) => {
        if(!window.confirm('Você deseja deletar esse Serviço?')) return

        api.delete(`servico/${id}`)
            .then(() => {
                setServicos((prev) => prev.filter((s) => s.id !== id))
            })
            .catch((err) => console.error('Erro ao excluir Serviço', err))
    }
    
    return (
        <>
            <div className="px-5 mx-5 pt-4">
                <h1>Lista de Serviços</h1>
            </div>

            {mensagemErro && (     
                <div className="px-5 mx-5 py-4">
                    <h2>Nada Registrado</h2>
                </div>
            )}

            {servicos.map((servico) => (
                <div className="px-5 mx-5 ">
                    <table className="table table-hover table-striped table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td scope="row">{servico.id}</td>
                                <td>{servico.nome}</td>
                                <td>R${servico.valor}</td>
                                <td style={{width:'10px'}}>
                                    <div className="d-flex gap-1">
                                        <button className="btn btn-outline-warning" 
                                            onClick={(e) => seletorView('CadastroServico', e, null, null, servico)}
                                        >
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>

                                        <button className="btn btn-outline-danger"
                                            onClick={() => deletar(servico.id)}
                                        >
                                            <i className="bi bi-trash-fill"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
                        

        </>
    )
}

export default ListaServico