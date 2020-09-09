### API completa com Typescript utilizando TDD, Clean Architecture, Design Patterns e SOLID.

#### .editorconfig
Install Plugin EditorConfig in Vscode.
~~~editorconfig
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf
~~~

#### .vscode and settings.json
~~~json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
~~~
#### Init Project Node
~~~bash
yarn init -y or yarn init
~~~

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

#### Install Typecript and tsconfig.json
~~~bash
  yarn add -D typescript @types/node ts-node-dev tsconfig-paths

  yarn tsc --init
~~~

##### tsconfig.json
~~~json
{
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "lib": ["ES6"],
    "allowJs": true,
    "sourceMap": true,
    "outDir": "./dist",
    "removeComments": true,
    "baseUrl": ".",
    "paths": {
      "@config/*": [
        "./src/config/*"
      ],
      "@controllers/*": [
        "./src/controllers/*"
      ],
      "@database/*": [
        "./src/database/*"
      ],
      "@middleware/*": [
        "./src/middleware/*"
      ],
      "@repository/*": [
        "./src/repository/*"
      ],
      "@routes/*": [
        "./src/routes/*"
      ],
      "@services/*": [
        "./src/services/*"
      ]
    },
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
~~~

[NODEJS SUPPORT VERSION node.green](https://node.green/)

##### Script ts-node-dev.
###### Flags
  * --respawn -- finaliza todos os processos toda  vez que o servidor da um restart.
  * --transpile-only -- ira so transpilar o arquivos sem check de tipagem, usamos o eslint pras verificações.
  * --ignore-watch <filepath>  -- n~ao ira ficar manitorando o arquivo.
  * --no-notify não ira ficar notificando toda vez que o servidor reiniciar.
~~~json
"dev": "ts-node-dev --require tsconfig-paths/register --respawn --transpile-only  --ignored-watch node_modules --no-notify ./src/services/server.ts",
~~~


#### Install Prettier and .prettierrc.js
Install Plugin Prettier in Vscode.
~~~bash
  yarn add --dev prettier eslint-plugin-prettier eslint-config-prettier
~~~

##### .prettierrc.js
~~~js
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWadth: 2,
};
~~~


#### Install Eslint Standard Typescript
Install Plugin Eslint in Vscode.
~~~bash
  yarn add --dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-plugin-import

  yarn eslint --init
~~~
##### .eslintrc.js
~~~js
module.exports = {
  env: {
    es2017: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    Shared: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'class-methods-use-this': 'off',
    'no-return-await': 'off',
    'import/no-unresolved': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
~~~
##### .eslintignore
~~~
.vscode
dist
node_modules
~~~

#### Install Husky
Hooks são comandos executados antes de executar os commits ou push.
Com isso os arquivos que não estive nos padrões do eslint ou não passa nos teste não sera feito o commit ou push.
[Repositório - Husky](https://github.com/typicode/husky)
~~~bash
yarn add --dev husky lint-staged

// lint-staged -> permite que rodem nos arquivos que iram entrar no próximo commit "git add --all".
~~~
.huskyrc.json
~~~js
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged", //sera rodado em todos os  arquivos passados no stagedrc.json
      "pre-push": "yarn test"
    }
  }
}
~~~
.lintstagedrc.json
~~~js
{
  "*.ts": [
    "eslint 'src/**' --fix", // "--fix" vai tentar corrigir o problema.
    "git add" //se consiguir corrigir sera adicionado a alteração feita
  ]
}
~~~
#### Install Jest
Lib utilizada para realização de teste.
~~~bash
yarn add -D jest @types/jest ts-jest

yarn jest --init
~~~
jest.config.js
~~~js
module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
~~~



