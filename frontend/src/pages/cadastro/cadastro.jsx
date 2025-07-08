const HomeCadastro = ({tema , seletorView}) => {
    return(
        <>
            <ul className="list-group list-group-flush mx-5 px-5 py-4">
                <h1 className="pb-4">Cadastro</h1>
                <li className="list-group-item" 
                    onClick={(e) => seletorView('CadastroCliente', e)}
                    style={{ cursor: 'pointer' }}>
                        Cadastro de Cliente
                </li>
                <li className="list-group-item" 
                    onClick={(e) => seletorView('CadastroPet', e)}
                    style={{ cursor: 'pointer' }}>
                        Cadastro de Pet
                </li>
                <li className="list-group-item" 
                    onClick={(e) => seletorView('CadastroProduto', e)}
                    style={{ cursor: 'pointer' }}>
                        Cadastro de Produto
                </li>
                <li className="list-group-item" 
                    onClick={(e) => seletorView('CadastroServico', e)}
                    style={{ cursor: 'pointer' }}>
                        Cadastro de Serviço
                </li>
                <li className="list-group-item" 
                    onClick={(e) => seletorView('CadastroConsumo', e)}
                    style={{ cursor: 'pointer' }}>
                        Cadastro de Venda
                </li>
            </ul>
        </>
    )
}

export default HomeCadastro