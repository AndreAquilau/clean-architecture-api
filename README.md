### API completa com Typescript utilizando TDD, Clean Architecture, Design Patterns e SOLID.

#### Convencional Commits
Padrões de texto nos commits.

<type>: <description>

##### Tipos de commits
  * feat: quando é uma feature nova.
  * fix: quando é um bug fíxo.
  * chore: quando adicionamos uma nova configuração, setup, lib, class.
  * docs: criação ou mudança na documentação.
  * refactor: quando é feito alguma refatoração do código.
  * test: quando é feito alguma implementação de teste.

Exemplo:
~~~
git commit -m "chore: add yarn"
~~~
##### Recomendações
Não colocar letras maiúsculas nos commits, é sempre tudo minúsculo.
Pode-se fazer referência a uma classe "chore: add LoginController", aí sim pode-se colocar classe com letras maiúscula.
Não colocar ponto final, não usar verbo no passado "added".

##### Add git-commit-msg-linter
lib que irá garantir que os nos commits sigam os padrões recomendados.
~~~bash
yarn add --dev git-commit-msg-linter
~~~
##### .gitignore
~~~
node_modules
.vscode
yarn.lock*
~~~
##### Testando git-commit-msg-linter
~~~
git commit -m "add test README"

--------- ERROR -------------------------------------------
git commit -m "add test in readme"

  ************* Invalid Git Commit Message **************
  commit message: add test in readme
  correct format: <type>(<scope>): <subject>
  example: docs: update README add developer tips
~~~

##### Install Typecript
~~~bash
yarn add -D typescript @types/node

yarn tsc --init
~~~

[NODEJS SUPPORT VERSION node.green](https://node.green/)
