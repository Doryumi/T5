import { useEffect, useState } from "react"
import api from "../../api/api"

const ListaCliente = ({tema , seletorView}) => {
    const [clientes, setClientes] = useState([])
    const [mensagemErro , setMensagemErro] = useState(false)

    useEffect(() => {
        api.get('/clientes')
            .then((res) => setClientes(res.data))
            .catch((err) => console.error('Erro ao buscar cliente: ', err))
    }, [])
    
    useEffect(() => {
            clientes.length < 1
            ? setMensagemErro(true)
            : setMensagemErro(false)
    }, [clientes.length])

    const deletar = (id) => {
        if(!window.confirm('Você deseja deletar esse cliente?')) return
        
        api.delete(`/excluir` , {
            data: {id}
        })
        .then(() => {
            setClientes((prev) => prev.filter(cliente => cliente.id !== id))
        })
        .catch((err) => console.error('Erro ao excluir cliente: ', err))
    }

    return (
        <>
            <div className="px-5 mx-5 pt-4">
                <h1>Lista de Clientes</h1>
            </div>
            
            {mensagemErro && (     
                <div className="px-5 mx-5 py-4">
                    <h2>Nada Registrado</h2>
                </div>
            )}

            
            
            { clientes.map((cliente , index) => (
                <div className="px-5 mx-5 ">
                    <div className="accordion accordion-flush" id="accordionPanelsStayOpenExample" key={index}>


                        <div className="accordion-item">
                            <h2 className="accordion-header" id={`panelsStayOpen-heading${cliente.id}`}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${cliente.id}` }aria-expanded="false" aria-controls={`panelsStayOpen-collapse${cliente.id}`}>
                                {cliente.nome ? cliente.nome : 'Não Encontrado'}
                            </button>
                            </h2>
                            
                            <div id={`panelsStayOpen-collapse${cliente.id}`} className="accordion-collapse collapse" aria-labelledby={`panelsStayOpen-heading${cliente.id}`}>
                            <div className="accordion-body">
                                <div className="row">
                                    <div className="col">
                                        <h5>ID </h5>
                                        <p>Identificador: {cliente.id}</p>
                                    </div>
                                    {cliente.nomeSocial && (
                                        <div className="col">
                                            <h5>Nome Social</h5>
                                            <p>{cliente.nomeSocial}</p>
                                        </div>
                                    )}
                                    {/* <div className="col d-flex flex-column">
                                        <h5> CPF</h5>
                                        <span>Emitido em: 12/12/1234</span>
                                        <span>123.123.123-12</span>
                                    </div> */}
                                    {cliente.email && (
                                        <div className="col">
                                            <h5>Email</h5>
                                            <p>{cliente.email}</p>
                                        </div>
                                    )}
                                </div>
                                <hr />

                                {cliente.endereco && (
                                    <div className="row">
                                        <div className="col d-flex flex-column">
                                            <h5>Endereço</h5>
                                            <span>
                                                {cliente.endereco.rua || 'Rua Não Enconstrada'}, {`nº ${cliente.endereco.numero}` || 'Número Não Encontrado'} - {cliente.endereco.bairro || 'Bairro Não Encontrado'}, {cliente.endereco.cidade || 'Cidade Não Encontrada'} - {cliente.endereco.estado || 'Estado Não Encontrado'}
                                            </span>
                                            <span>
                                                {cliente.endereco.codigoPostal || 'CEP não encontrado'}
                                            </span>
                                        </div>
                                        {cliente.endereco.complemento && (
                                            <div className="col d-flex flex-column">
                                                <h5>Complemento</h5>
                                                <span>{cliente.endereco.complemento} </span>
                                            </div>
                                        )}
                                        <br />
                                    </div>
                                )}
                                <hr />

                                <div className="row">
                                    {/* <div className="col">
                                        <h5>RG's</h5>
                                        <table className="table table-hover table-borderless">
                                            <thead>
                                                <tr>
                                                <th scope="col">RG</th>
                                                <th scope="col">Data de Emissão</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>12.123.123-1</td>
                                                    <td>12/12/1234</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> */}
                                    
                                    {cliente.telefones.length > 0 && (
                                        <div className="col" key={index}>
                                            <h5>Telefones</h5>
                                            <table className="table table-hover table-borderless">
                                                <thead>
                                                    <tr key={index}>
                                                    <th scope="col">DDD</th>
                                                    <th scope="col">Número</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                            
                                            { cliente.telefones.map((telefone) => (
                                                <tr key={index}>
                                                    <td>({telefone.ddd})</td>
                                                    <td>{telefone.numero}</td>
                                                </tr>
                                            ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                </div>

                                {/* <hr />
                                <br />

                                <h5>Pets</h5>
                                <table className="table table-hover table-striped table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Tipo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row">1</td>
                                            <td>Pimenta</td>
                                            <td>Gato</td>
                                            <td>Siamês</td>
                                        </tr>
                                    </tbody>
                                </table> */}

                                <br />

                                <div className="row">
                                    <div className="col">
                                        <button className="btn btn-outline-warning w-100" 
                                        onClick={(e) => seletorView('CadastroCliente' , e, cliente)} >
                                            <i className="bi bi-pencil-fill"></i> 
                                            Atualizar 
                                        </button>
                                    </div>
                                    
                                    <div className="col">
                                        <button className="btn btn-outline-danger w-100" onClick={() => deletar(cliente.id)}>
                                            <i className="bi bi-trash-fill"></i> 
                                            Remover 
                                        </button>
                                        
                                    </div>

                                </div>
                                

                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
        </>
    )
}

export default ListaCliente