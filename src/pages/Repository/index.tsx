import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import api from '../../services/api'
import logoImage from '../../assets/logo.svg'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'


import { Header, RepositoryInfo, Issues } from './styles'
interface RepositoryParams {
    repository: string;
}
interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    }
}

interface Issue {
    id: number;
    title: string;
    login: string
}
const Repository: React.FC = () => {
    const [repository, setRepository] = useState<Repository | null>(null)
    const [issues, setIssues] = useState<Issue[]>([])
    const { params } = useRouteMatch<RepositoryParams>()

    useEffect(() => {
        api.get(`repos/${params.repository}`).then(resp => {
            setRepository(resp.data)

        })
        api.get(`repos/${params.repository}/issues`).then(resp => {
            setIssues(resp.data);

        })
    }, [params.repository])

    return (
        <>
            <Header>
                <img src={logoImage} alt="" />
                <Link to="/">
                    <FiChevronLeft size={16} />
                Voltar
            </Link>
            </Header>

            {repository && (
                <RepositoryInfo>
                    <header>
                        <img src={repository.owner.avatar_url} alt="" />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}
            <Issues>
                {issues.map(issue => {
                    return (
                        <Link key={issue.id} to="">
                            <div>
                    <strong>{issue.title}</strong>
                    <p>{issue.login}</p>
                            </div>
                            <FiChevronRight size={20}></FiChevronRight>
                        </Link>
                    )
                })}

            </Issues>
        </>
    )
}

export default Repository