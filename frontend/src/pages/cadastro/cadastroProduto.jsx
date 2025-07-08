import { useEffect, useState } from 'react'
import api from '../../api/api'

const CadastroProduto = ({tema, produto}) => {
    const [nome, setNome] = useState('')
    const [valor, setValor] = useState()

    function adicionarProduto() {
        const novoProduto = {
            nome: nome,
            valor: valor
        }

        api.post('/produto' , (novoProduto))
            .then(() => {
                console.log('Produto Cadastrado')
            })
            .catch((err) => console.error('Erro ao cadastrar Produto' , err))
    }

    useEffect(() => {
        if(produto) {
            setNome(produto.nome)
            setValor(produto.valor)
        }
    }, [produto])

    function atualizarProduto() {
        const id = produto.id
        const produtoAtualizado = {
            id: id,
            nome: nome,
            valor: valor
        }

        api.put(`produto/${id}` , (produtoAtualizado))
            .then(() => {
                console.log('Produto Atualizado!')
            })
            .catch((err) => console.error('Erro ao atualizar Produto', err))
    }
    

    return (
        <>
            <div className="container-fluid px-5">
                <form className="container-fluid px-5 py-4" onSubmit={produto ? atualizarProduto : adicionarProduto}>
                    <h1 className="pb-4">{produto ? 'Atualizar' : 'Cadastrar'} Produto</h1>
                    
                    
                    <div className="row">
                        <div className="mb-3 col-10">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Nome do Produto" aria-label="Nome do Produto" aria-describedby="basic-addon1" value={nome} required onChange={(e) => setNome(e.target.value)} />
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="input-group mb-3">
                                <span className="input-group-text">$</span>
                                <input type="number" className="form-control" aria-label="Valor do Produto" placeholder="Valor do Produto" value={valor} required onChange={(e) => setValor(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>{produto ? 'Atualizar' : 'Cadastrar'}</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default CadastroProduto