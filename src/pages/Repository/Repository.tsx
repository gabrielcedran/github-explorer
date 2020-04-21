import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, RepositoryInfo, Issues } from './Repository.styles';
import logoImage from '../../assets/logo.svg';
import Github from '../../services/GithubApi';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  owner: {
    avatar_url: string;
    login: string;
  };
  name: { full_name: string };
  description: string;
  forks: number;
  stargazers_count: number;
  open_issues_count: number;
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: { login: string };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([] as Issue[]);

  useEffect(() => {
    Github.get<Repository>(`/repos/${params.repository}`)
      .then(({ data }) => {
        setRepository(data);
      })
      .catch(response => {});
    Github.get<Issue[]>(`/repos/${params.repository}/issues`)
      .then(({ data }) => {
        setIssues(data);
      })
      .catch(response => {});

    /* In general it is a bad practice, the following is an example of how to use async/await inside useEffect,
    since it is synchronous and does not accept promises as return.

    async function loadData(): Promise<void> {
      const repository = await Github.get(`/repos/${params.repository}`);
      const issues = await Github.get(`/repos/${params.repository}/issues`);

      console.log(repository);
      console.log(issues);
    }
    loadData();

    Another possibility is use the Promise.all:
    const[repository, issues] = await Promise.all([
      Github.get(`/repos/${params.repository}`),
      Github.get(`/repos/${params.repository}/issues`)
    ]);
    */
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImage} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.name.full_name}
            />
            <div>
              <strong>{repository.name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues Abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues.map(issue => {
          return (
            <a
              key={issue.id}
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>
              <FiChevronRight size={16} />
            </a>
          );
        })}
      </Issues>
    </>
  );
};

export default Repository;
