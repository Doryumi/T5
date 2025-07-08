import { useEffect, useState } from "react"
import api from '../../api/api'

const ListaProduto = ({tema, seletorView}) => {
    const [produtos, setProdutos] = useState([])
    const [mensagemErro , setMensagemErro] = useState(false)


    useEffect(() => {
        api.get('/produto')
            .then((res) => setProdutos(res.data))
            .catch((err) => console.error('Erro ao buscar Produtos: ', err))
    }, [])

    useEffect(() => {
        produtos.length < 1
        ? setMensagemErro(true)
        : setMensagemErro(false)
    }, [produtos.length])

    const deletar = (id) => {
        if(!window.confirm('Você deseja deletar esse Produto?')) return

        api.delete(`produto/${id}`)
            .then(() => {
                setProdutos((prev) => prev.filter((p) => p.id !== id))
            })
            .catch((err) => console.error('Erro ao excluir Produto', err))
        
    }

    return (
        <>
            <div className="px-5 mx-5 pt-4">
                <h1>Lista de Produtos</h1>
            </div>

            {mensagemErro && (     
                <div className="px-5 mx-5 py-4">
                    <h2>Nada Registrado</h2>
                </div>
            )}
            
            {produtos.map((produto) => (
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
                                <td scope="row">{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>R${produto.valor}</td>
                                <td style={{width:'10px'}}>
                                    <div className="d-flex gap-1">
                                        <button className="btn btn-outline-warning"
                                            onClick={(e) => seletorView('CadastroProduto', e, null, produto, null)}
                                        >
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>

                                        <button className="btn btn-outline-danger"
                                            onClick={() => deletar(produto.id)}
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

export default ListaProduto