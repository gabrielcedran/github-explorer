import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import logoImage from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './Dashboard.styles';
import GithubApi from '../../services/GithubApi';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });
  const [inputError, setInputError] = useState('');
  const [repositoryInput, setRepositoryInput] = useState('');

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    // Stop the form default behavior - which is submit
    event.preventDefault();

    if (!repositoryInput) {
      setInputError('Digite o auto/nome do repositório');
      return;
    }

    try {
      const response = await GithubApi.get<Repository>(
        `/repos/${repositoryInput}`,
      );
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setRepositoryInput('');
      setInputError('');
    } catch (err) {
      setInputError('Erro ao buscar repositorio');
    }
  }

  return (
    <>
      <img src={logoImage} alt="Github Explorer" />
      <Title>Explore repositórios no github</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={repositoryInput}
          onChange={event => setRepositoryInput(event.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map(repository => {
          return (
            <Link
              key={repository.full_name}
              to={`/repository/${repository.full_name}`}
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          );
        })}
      </Repositories>
    </>
  );
};

export default Dashboard;