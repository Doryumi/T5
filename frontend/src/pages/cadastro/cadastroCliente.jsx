import { useEffect, useState } from "react";
import api from "../../api/api";

const CadastroCliente = ({tema , cliente}) => {
    const [nome , setNome] = useState('')
    const [nomeSocial , setNomeSocial] = useState('')
    const [email , setEmail] = useState('')

    const [cep , setCep] = useState('')
    const [estado , setEstado] = useState('')
    const [cidade , setCidade] = useState('')
    const [bairro , setBairro] = useState('')
    const [rua , setRua] = useState('')
    const [numeroEndereco , setNumeroEndereco] = useState()
    const [complementoEndereco , setComplementoEndereco] = useState('')

    const [telefones , setTelefones] = useState([])
    const [ddd , setDdd] = useState('')
    const [numeroTelefone , setNumeroTelefone] = useState('')

    function adicionarCliente() {

        if(ddd && numeroTelefone){
            adicionarTel()
        }

        const novoCliente = {
            nome: nome,
            nomeSocial: nomeSocial,
            email: email,
            endereco: {
                codigoPostal: cep,
                estado: estado,
                cidade: cidade,
                bairro: bairro,
                rua: rua,
                numero: numeroEndereco,
                complemento: complementoEndereco
            },
            telefones: telefones
        }
        
        api.post('/cadastrar' , (novoCliente))
            .then(() => {
                console.log('Cliente Cadastrado')
            })
            .catch((err) => console.error('Erro ao cadastrar cliente' , err))
    }

    useEffect(() => {
        if(cliente){
            setNome(cliente.nome || '')
            setNomeSocial(cliente.nomeSocial || '')
            setEmail(cliente.email || '')

            const endereco = cliente.endereco
            setCep(endereco.codigoPostal || '')
            setEstado(endereco.estado || '')
            setCidade(endereco.cidade || '')
            setBairro(endereco.bairro || '')
            setRua(endereco.rua || '')
            setNumeroEndereco(endereco.numero || '')
            setComplementoEndereco(endereco.complemento || '')

            setTelefones(cliente.telefones || [])
        }
    }, [cliente])

    function atualizarCliente() {
        const clienteAtualizado = {
            id: cliente.id,
            nome: nome,
            nomeSocial: nomeSocial,
            email: email,
            endereco: {
                codigoPostal: cep,
                estado: estado,
                cidade: cidade,
                bairro: bairro,
                rua: rua,
                numero: numeroEndereco,
                complemento: complementoEndereco
            },
            telefones: telefones
        }

        api.put('/atualizar' , (clienteAtualizado))
            .then(() => {
                console.log('Cliente Atualizado!')
            })
            .catch((err) => console.error('Erro ao atualizar cliente', err))
    }

    function adicionarTel() {
        if((!ddd || !numeroTelefone)){
            alert('Complete os campos anteriores antes de adicionar um telefone')
            return
        }
        
        const novoTelefone = {
            ddd: ddd,
            numero: numeroTelefone,
        }
        setTelefones([...telefones , novoTelefone])

        setDdd('')
        setNumeroTelefone('')
    }

    function removerTel(index) {
        const novaLista = telefones.filter((_ , i) => i !== index)
        setTelefones(novaLista)
    }


    return (
        <>
            <div className="container-fluid px-5">

                <form className="container-fluid px-5 py-4" onSubmit={ cliente ? atualizarCliente : adicionarCliente}>
                    <h1 className="pb-4">{cliente ? 'Atualizar' : 'Cadastrar'} Cliente</h1>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome *" aria-label="Nome *" aria-describedby="basic-addon1" value={nome} required onChange={(e) => setNome(e.target.value)} />
                    </div>


                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome social" aria-label="Nome social" aria-describedby="basic-addon1" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)}/>
                    </div>
                    
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1" style={{ background: tema }}>@</span>
                        <input type="email" className="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    

                    <h5 className="mt-4">Endereço</h5>

                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="CEP *" aria-label="CEP *" aria-describedby="basic-addon1" value={cep} required onChange={(e) => setCep(e.target.value)}/>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Estado *" aria-label="Estado *" aria-describedby="basic-addon1" value={estado} required onChange={(e) => setEstado(e.target.value)} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Cidade *" aria-label="Cidade *" aria-describedby="basic-addon1" value={cidade} required onChange={(e) => setCidade(e.target.value)} />
                        </div>
                        

                    <div className="row">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Bairro *" aria-label="Bairro *" aria-describedby="basic-addon1" value={bairro} required onChange={(e) => setBairro(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Rua *" aria-label="Rua *" aria-describedby="basic-addon1" value={rua} required onChange={(e) => setRua(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Número *" aria-label="Número *" aria-describedby="basic-addon1" value={numeroEndereco} required onChange={(e) => setNumeroEndereco(e.target.value)} />
                            </div>
                    </div>
                    <textarea className="form-control mb-5" id="exampleFormControlTextarea1" rows="3" placeholder="Complemento" value={complementoEndereco} onChange={(e) => setComplementoEndereco(e.target.value)}></textarea>

                    <div className="col">
                        <h5>Telefones</h5>
                        <table className="table table-hover table-borderless align-middle">
                            <thead>
                                <tr>
                                <th scope="col">DDD</th>
                                <th scope="col">Número</th>
                                <th scope="col">Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                        
                        { telefones.map((telefone , index) => (
                            <tr key={index}>
                                <td>({telefone.ddd})</td>
                                <td>{telefone.numero}</td>
                                <td style={{width:'10px'}}>
                                    <button className="btn btn-outline-danger" type="button" onClick={() => removerTel(index)}>
                                        <i className="Excluir"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}

                            </tbody>
                        </table>
                    </div>



                    <div className="row">
                        <div className="col-2">
                            <div className="input-group mb-3">
                                <input type="number" className="form-control" placeholder="DDD do Telefone" aria-label="DDD do Telefone" aria-describedby="basic-addon1" value={ddd} onChange={(e) => setDdd(e.target.value)}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group mb-3">
                                <input type="number" className="form-control" placeholder="Número de Telefone" value={numeroTelefone} onChange={(e) => setNumeroTelefone(e.target.value)} />
                            </div>
                        </div>    
                        <div className="col-3">
                            <div className="input-group mb-3">
                                <button className="btn btn-outline-primary w-100" type="button" style={{ background: tema }} onClick={adicionarTel} > Adicionar Telefone </button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}> {cliente ? ('Atualizar') : ('Cadastrar')} </button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default CadastroCliente