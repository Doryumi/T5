
export default function ListaIndex({ tema, seletorView }) {
    const opcoesLista = [
        { tela: 'ListaCliente', label: 'Listar todos os Clientes' },
        { tela: 'ListaPet', label: 'Listar todos os Pets' },
        { tela: 'ListaProduto', label: 'Listar todos os Produtos' },
        { tela: 'ListaServico', label: 'Listar todos os Serviços' },
        { tela: 'ListaConsumo', label: 'Listar Consumos' }
    ];

    return (
        <div>
            <ul className="list-group list-group-flush mx-5 px-5 py-4">
                <h1 className="pb-4">Listas</h1>
                {opcoesLista.map((opcao) => (
                    <li 
                        key={opcao.tela}
                        className="list-group-item" 
                        onClick={(e) => seletorView(opcao.tela, e)}
                        style={{ cursor: 'pointer' }}
                    >
                        {opcao.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}