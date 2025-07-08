/* eslint-disable no-unused-vars */
import { useState } from "react";
import BarraNavegacao from "../componentes/barraNavegacao"

import ListaIndex from "../pages/listas/lista";
import ListaCliente from "../pages/listas/listaClientes";
import ListaPet from "../pages/listas/listaPets";
import ListaProduto from "../pages/listas/listaProdutos";
import ListaServico from "../pages/listas/listaServicos";
import ListaConsumo from "../pages/listas/listaConsumo";

import CadastroIndex from "../pages/cadastro/cadastro";
import CadastroCliente from "../pages/cadastro/cadastroCliente";
import CadastroPet from "../pages/cadastro/cadastroPet";
import CadastroProduto from "../pages/cadastro/cadastroProduto";
import CadastroServico from "../pages/cadastro/cadastroServico";
import CadastroConsumo from "../pages/cadastro/cadastroConsumo";


export default function Roteador() {
    const [tela, setTela] = useState('Listar')
    const [cliente , setCliente] = useState(null)

    const selecionarView = (valor, e, cliente = null) => {
        e.preventDefault()
        setCliente(cliente)
        setTela(valor)
    }

    const construirView = () => {
        if (tela === 'Listar') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Listar', 'Cadastrar']} />
                    <div className="">
                        <ListaIndex tema="#e3f2fd" seletorView={selecionarView}/>
                    </div>
                </>
            )
        }
        else
        if (tela === 'ListaCliente') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Listar', 'Cadastrar']} />
                    <div className=" ">
                        <ListaCliente tema="#e3f2fd" seletorView={selecionarView}/>
                    </div>
                </>
            )
        }
        else
        if (tela === 'ListaPet') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Listar', 'Cadastrar']} />
                    <div className=" ">
                        <ListaPet tema="#e3f2fd" seletorView={selecionarView}/>
                    </div>
                </>
            )
        }
        else
        if (tela === 'ListaProduto') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Listar', 'Cadastrar']} />
                    <div className=" ">
                        <ListaProduto tema="#e3f2fd" seletorView={selecionarView}/>
                    </div>
                </>
            )
        }
        else
        if (tela === 'ListaServico') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Listar', 'Cadastrar']} />
                    <div className=" ">
                        <ListaServico tema="#e3f2fd" seletorView={selecionarView}/>
                    </div>
                </>
            )
        }        
        else
        if (tela === 'ListaConsumo') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Listar', 'Cadastrar']} />
                    <div className=" ">
                        <ListaConsumo tema="#e3f2fd"/>
                    </div>
                </>
            )
        }





        else
        if (tela === 'Cadastrar') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Listar', 'Cadastrar']} />
                    <div className=" ">
                        <CadastroIndex tema="#e3f2fd" seletorView={selecionarView}/>
                    </div>
                </>
            )
        }
        else
        if (tela === 'CadastroCliente') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Listar', 'Cadastrar']} />
                    <div className=" ">
                        <CadastroCliente tema="#e3f2fd" cliente={cliente}/>
                    </div>
                </>
            )
        }
        else
        if (tela === 'CadastroPet') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Listar', 'Cadastrar']} />
                    <div className=" ">
                        <CadastroPet tema="#e3f2fd"/>
                    </div>
                </>
            )
        }
        else
        if (tela === 'CadastroProduto') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Listar', 'Cadastrar']} />
                    <div className=" ">
                        <CadastroProduto tema="#e3f2fd"/>
                    </div>
                </>
            )
        }
        else
        if (tela === 'CadastroServico') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Listar', 'Cadastrar']} />
                    <div className=" ">
                        <CadastroServico tema="#e3f2fd"/>
                    </div>
                </>
            )
        }

        else
        if (tela === 'CadastroConsumo') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Listar', 'Cadastrar']} />
                    <div className=" ">
                        <CadastroConsumo tema="#e3f2fd"/>
                    </div>
                </>
            )
        }
    }

    return (
        construirView()
    )
}