import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImage from '../../assets/logo.svg';
import { Title, Form, Repositories } from './Dashboard.styles';
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
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repositoryInput, setRepositoryInput] = useState('');

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    // Stop the form default behavior - which is submit
    event.preventDefault();
    const response = await GithubApi.get<Repository>(
      `/repos/${repositoryInput}`,
    );
    const repository = response.data;
    setRepositories([...repositories, repository]);
    setRepositoryInput('');
  }

  return (
    <>
      <img src={logoImage} alt="Github Explorer" />
      <Title>Explore repositórios no github</Title>
      <Form onSubmit={handleAddRepository}>
        <input
          value={repositoryInput}
          onChange={event => setRepositoryInput(event.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        {repositories.map(repository => {
          return (
            <a key={repository.full_name} href="test/">
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size={20} />
            </a>
          );
        })}
      </Repositories>
    </>
  );
};

export default Dashboard;
