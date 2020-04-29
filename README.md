# Github Explorer
Esse projeto foi criado durante o bootcamp gostack 11 da [rocketseat](https://rocketseat.com.br/) como um primeiro projeto completo em ReactJS consumindo uma API real, para que os participantes pudessem ter uma primeira experiência de como o desenvolvimento web é feito no mundo do React.

A principal funcionalidade dessa aplicação é listar repositórios do github inseridos pelo usuário no formato {username}/{repository}. Uma vez listado, é possível clicar no repositório e ver todas as issues abertas e algumas métricas, como número de forks, starts e total de issues abertas.


O resultado final da aplicação pode ser acessado em [gabrielcedra.me](gabrielcedran.me). 

### Stack utilizada
- React
- React Router Dom
- Styled Components
- Typescript
- React Icons
- Polished
- Axios
- Eslinnt
- Prettier
- Yarn

### Preparando o ambiente de desenvolvimento
O projeto foi criado com a ferramenta create-react-app e yarn e não foi ejetado desde então, portanto possui os scripts que vem por padrao:

#### yarn: 
Ao clonar o repositório, execute o comando yarn na raiz do projeto para instalar todas a dependências.
#### yarn start:
Para iniciar o servidor de desenvolvimento, execute yarn start (o servidor padrão executará na porta 3000).
#### yarn build:
Para gerar um artefato de produção, execute o comando yarn build.
#### yarn eject:
Caso seja necessário alguma configuração customizada que não é possível alcançar com a configuração padrão (por exemplo alguma configuração específica do webpack), basta executa o comando yarn eject e toda a estrutura que é encapsulada pelo react-scripts será criada no projeto para que possa ser alterada. Esse comando deve ser executado com cautela, pois uma vez feito, não tem como desfazer.


