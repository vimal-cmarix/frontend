# Sizigi

## Desenvolvimento

Primeiro, inicie o servidor de desenvolvimento:

```bash
docker-compose up --build
```

Acesse [http://localhost:3000](http://localhost:3000) para ver os resultados.
O browser é atualizado automaticamente conforme você edita os arquivos.

## Referral Rock

Nos ambientes de desenvolvimento, teste e homologação, é usada uma conta de teste para validar as conversões via [referral rock](https://referralrock.com/). Essa conta expira a cada 14 dias, portanto é importante que sempre que uma nova conta de teste for criada, a key `REFERRAL_ROCK_KEY` seja atualizada em todos os arquivos .env, e os dados de acesso sejam atualizados no README.md.

#### Passos para acessar a plataforma Referral Rock

Acesse o gmail com a conta:

`email: sizigitrial@gmail.com`

`password: sizigi123`

Para acessar a conta de testes, você deve acessar a plataforma do [referral rock](https://referralrock.com/) e fazer login via google com a conta mencionada acima.

## Documentações

Depois, inicie o servidor de documentação de componentes.

```bash
npm run docs:serve
```

Acesse [http://localhost:6060](http://localhost:6060) para ver os resultados.

## Testes

```bash
npm run test
```

## Configurações

##### Alias

Para adicionar novos `alias` no projeto, inclua o novo path no arquivo `.babelrc`.
(É preciso atualizar o JS Config com o novo path)

Exemplo:

```javascript
"alias": {
  "@components": "./src/components"
}
```

##### JS Config

Arquivo de configuração para mapear os paths no VS Code.
Arquivo: `jsconfig.json`

##### Style Guide

O arquivo `styleguide.config.js` serve para configurar como as documentações dos componentes serão apresentadas no servidor local de documentações. ([http://localhost:6060](http://localhost:6060))

Exemplo:

```javascript
module.exports = {
  title: 'Sizigi',
  sections: [
    {
      name: 'Section 1',
      components: 'src/components/**/*.jsx',
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },

  ...
```

## Escrevendo Componentes

##### PropTypes

**Todos** os componentes que possuem `props`, precisam ser validados utilizando a dependência `PropTypes` para assegurar a validade dos dados.

Exemplo de implementação:

```javascript
import PropTypes from 'prop-types';

const Greeting = { name } => {
  return <h1>Hello, {name}</h1>
}

Greeting.propTypes = {
  name: PropTypes.string,
};

export default Greeting;
```

[Veja mais sobre PropTypes na documentação oficial.](https://reactjs.org/docs/typechecking-with-proptypes.html)

##### Desustruração de Props

Deve-se usar a desustruração de 2 formas:

1. Quando o componente não possuir `state` deve-se desustruturar diretamente nos parametros da função:

```javascript
const TextInput = ({ value, placeholder, disabled, size, onChange }) => {
  ...
}
```

2. Quando o componente possuir `state` deve-se desustrurar dentro da função para melhor intendimento das variáveis:

```javascript
const TextInput = props => {
  const { value, placeholder, disabled, size, onChange } = props;
  const { userName, userEmail } = state;
};
```

##### Importando Componentes

Para facilitar importações utilize sempre os `alias` disponíveis no arquivo `jsconfig.json`:

```javascript
import Navbar from '@components/Navbar'; // CORRECT
// import Navbar from '../../../components/Navbar'; // INCORRECT
```

##### Desustruração de Props

Deve-se usar a desustruração de 2 formas:

1. Quando o componente não possuir `state` devemos desustruturar diretamente nos parametros da função:

```javascript
const TextInput = ({ value, placeholder, disabled, size, onChange }) => {
  ...
}
```

2. Quando o componente possuir `state` devemos desustrurar dentro da função para melhor intendimento das variáveis:

```javascript
const TextInput = props => {
  const { value, placeholder, disabled, size, onChange } = props;
  const { userName, userEmail } = state;
};
```

##### Estilizando Componentes

Para criar componentes estilizados, deve ser utilizada a dependência `Styled Components`, onde todos os estilos de um componente devem estar em um arquivo separado chamado `styles.js`:

Path: `Navbar/Styles.js`

```javascript
import styled from 'styled-components';

export const Container = styled.div`
  background-color: black;
  ...;
`;
```

Path: `Navbar/index.jsx`

```javascript
import { Container } from './styles';

const Navbar = () => <Container>...</Container>;
```

[Veja mais sobre Styled Components na documentação oficial.](https://styled-components.com/)

---

[Veja mais sobre o Jest na documentação oficial.](https://jestjs.io/docs/en/tutorial-react)

---

## Documentando Components

Para documentação de componentes, está sendo utilizado a dependência `React Styleguidist`.

Os componentes serão documentados através de comentários no código do prório componente.

Exemplo (`Title/index.jsx`):

```javascript
import Title from './styles';

/**
 * Component description goes here
 */
const Title = props => {
  const { text, color, size } = props;

  return (
    <Title color={color} size={size}>
      {text}
    </Title>
  );
};

Title.propTypes = {
  /** Text is required */
  text: PropTypes.string.isRequired,
  /** Default color: #000000 */
  color: PropTypes.string,
  /** Default size: 24px */
  size: PropTypes.number,
};
```

Para visualizar o seu componente no server de documentações, deve ser criado um arquivo com a extensão `.md` na estrutura de arquivos do componente. Este arquivo deverá conter as variações de visualização do seu componente.

Exemplo (`Title/Title.md`):

```markdown
Title Basic Component:
`js <Title text="Lorem ipsum" />`

Title with custom color:
`js <Title text="text 2" color="red"/>`

Title with custom font size:
`js <Title text="text 2" size={30}/>`
```

[Veja mais sobre o Style Guidist na documentação oficial.](https://github.com/styleguidist/react-styleguidist)

---

## Estrutura de arquivos:

Depois de codificar o componente, testar e documentar, a estrutura final dos arquivos de um componente deverá ser similar ao exemplo abaixo:

```bash
.
├── src
|   └── components
|      └── Navbar
|         ├── index.jsx
|         ├── styles.js
|         ├── Navbar.test.js
|         └── Navbar.md
```

---

## Internacionalização:

Para internacionalização de textos, está sendo utilizado a dependência `i18n`.

A `public/locales` contém os diretórios específicos de cada idioma.

```bash
.
├── public
|   └── locales
|      └── en
|         ├── home.json
|         └── events.json
|      └── pt
|         └── home.json
|         └── events.json
```

Cada arquivo `json` dos diretórios acima irão conter os textos necessários.

```javascript
{
  "title": "Home (en)"
}
```

Exemplo de utilização:

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';
import Title from '@components/Title';

const EventsPage = () => {
  const { t } = useTranslation(['home']);

  return <Title text={t('title')} />;
};

export default EventsPage;
```

[Veja mais sobre o i18n na documentação oficial.](https://github.com/i18next/react-i18next)

---

## Gitflow

##### Começando uma nova feature:

```bash
  git checkout -b feature/new_feature
    <code your feature here>
```

##### Atualizando a branch da sua feature com os commits mais recentes da develop:

```bash
  git checkout develop
  git pull origin develop

  git rebase develop feature/new_feature
    <resolve possible conflicts> # session below

  git push origin feature/new_feature --force
```

##### Resolvendo possíveis conflitos:

Para resolver conflitos durante o `rebase` você tem 3 opções:

- **Continue**: Resolva os conflitos e continue para o próximo commit.

  ```bash
    git rebase --continue
  ```

- **Abort:** Caso você queira desistir durante o rebase.
  ```bash
    git rebase --abort
  ```

* **Skip:** Caso você queira pular completamente um commit, isso significa que nenhuma das mudanças introduzidas neste commit específico serão incluídas no seu código mais atualizado.
  ```bash
    git rebase --skip
  ```

##### Atualizando a develop com a sua feature:

```bash
<after rebase>

git checkout develop
git merge feature/new_feature --no-ff # (Squash flag if you are creating a PR)
git push origin develop
```

[Veja o gitflow completo aqui.](https://docs.google.com/presentation/d/1jjo0SrYFescPTyohDvWZ3iPJg0cL_ZPBcbw80rrfvpA/edit?usp=sharing)

---

## Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
