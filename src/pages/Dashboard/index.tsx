import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

import logoImage from '../../assets/logo.svg'


import { Title, Form, Repositories } from './styles'
const Dashboard: React.FC = () => {
    return (
        <>
            <img src={logoImage} alt="Github Explorer" />
            <Title>Explore repositórios no Github</Title>
            <Form>
                <input placeholder="Digite o nome do repositório" />
                <button type="submit">Pesquisar</button>
            </Form>

            <Repositories>
                <a href="teste">
                    <img src="https://avatars2.githubusercontent.com/u/45246117?s=460&v=4" alt="" />

                    <div >
                        <strong>Thomaz Bittencourt</strong>
                        <p>Repositório de teste</p>
                    </div>
                <FiChevronRight size={20}></FiChevronRight>
                </a>
                <a href="teste">
                    <img src="https://avatars2.githubusercontent.com/u/45246117?s=460&v=4" alt="" />

                    <div >
                        <strong>Thomaz Bittencourt</strong>
                        <p>Repositório de teste</p>
                    </div>
                <FiChevronRight size={20}></FiChevronRight>
                </a>
                <a href="teste">
                    <img src="https://avatars2.githubusercontent.com/u/45246117?s=460&v=4" alt="" />

                    <div >
                        <strong>Thomaz Bittencourt</strong>
                        <p>Repositório de teste</p>
                    </div>
                <FiChevronRight size={20}></FiChevronRight>
                </a>
            </Repositories>
        </>
    )
}

export default Dashboard