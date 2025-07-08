import { useEffect, useState } from 'react'
import api from '../../api/api'

const CadastroServico = ({tema, servico}) => {
    const [nome, setNome] = useState('')
    const[valor, setValor] = useState()

    function adicionarServico(){
        const novoServico = {
            nome: nome,
            valor: valor,
        }

        api.post('/servico' , (novoServico))
            .then(() => {
                console.log('Serviço Cadastrado!')
            })
            .catch((err) => console.error('Erro ao cadastrar Produto' , err))
    }

    useEffect(() => {
        if(servico){
            setNome(servico.nome)
            setValor(servico.valor)
        }
    }, [servico])

    function atualizarServico() {
        const id = servico.id
        const servicoAtualizado = {
            id: id,
            nome: nome,
            valor: valor,
        }

        api.put(`servico/${id}`, (servicoAtualizado))
            .then(() => {
                console.log('Serviço Atualizado!')
            })
            .catch((err) => console.error('Erro ao atualizar Serviço', err))
    }

    return (
        <>
            <div className="container-fluid px-5">

                <form className="container-fluid px-5 py-4" onSubmit={servico ? atualizarServico : adicionarServico}>
                    <h1 className="pb-4">{servico ? 'Atualização' : 'Cadastro'} de Serviço</h1>
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
                        <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>
                            {servico ? ('Atualizar') : ('Cadastrar')}
                        </button>
                    </div>

                </form>
            </div>
        </>
    )

}

export default CadastroServico