import React, { useState, useEffect, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'
import logoImage from '../../assets/logo.svg'
import { Link} from 'react-router-dom'


import { Title, Form, Repositories, Error } from './styles'

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {

    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@githubexplorer:repositories');

        if(storagedRepositories) {
            return JSON.parse(storagedRepositories)
        }else{
            return []
        }
    });
    const [inputError, setInputError] = useState('')
    const [newRepo, setNewRepo] = useState('')


    useEffect(() => {
        localStorage.setItem('@githubexplorer:repositories', JSON.stringify(repositories ))
    },[repositories])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault()

        if (!newRepo) {
            setInputError('Digeite o autor/nome do repositório')
            return
        }


        try {
            const response = await api.get<Repository>(`repos/${newRepo}`)
            const repository = response.data


            setRepositories([...repositories, repository])
            setNewRepo('')
            setInputError('')
        } catch (error) {
            setInputError('Erro ao buscar repositório')
        }


    }
    return (
        <>
            <img src={logoImage} alt="Github Explorer" />
            <Title>Explore repositórios no Github</Title>
            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    placeholder="Digite o nome do repositório"
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map(repository => (
                    <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login} />

                        <div >
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                        <FiChevronRight size={20}></FiChevronRight>
                    </Link>
                ))}


            </Repositories>
        </>
    )
}

export default Dashboard