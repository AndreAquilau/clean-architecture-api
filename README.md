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
"scripts" : {
    "start": "node ./dist/services/server.js",
    "dev": "ts-node-dev --require tsconfig-paths/register --respawn --transpile-only  --ignore-watch node_modules --no-notify ./src/services/server.ts",
}
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
lint-staged -> permite que rodem nos arquivos que iram entrar no próximo commit "git add --all".
~~~bash
yarn add --dev husky lint-staged
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
    "eslint 'src/**' --fix",
    "yarn test:staged"
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
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!##/test/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};
~~~
##### Test Script Jest
~~~
  "scripts": {
    "test": "jest --passWithNoTests --silent --noStackTrace --runInBand \"--coverage\"",
    "test:staged": "jest --passWithNoTests --silent --noStackTrace --runInBand \"--coverage\" ",
  }
~~~


#### Install Babel and babel.config.js
~~~bash
yarn add --dev bebel @babel/cli @babel/core @babel/node @babel/preset-end @babel/preset-typescript babel-plugin-module-resolver @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
~~~
babel.config.js
~~~js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@controllers': './src/controllers',
          '@database': './src/database',
          '@middleware': './src/middleware',
          '@models': './src/models',
          '@repository': './src/repository',
          '@routes': './src/routes',
          '@services': './src/services',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  ignore: ['**/*.spec.ts'],
};
~~~
##### Build Script Babel
~~~js
--extensions      = qual são os aquivos que seram compilados
--out-dir        = diretorio de saída
--copy-files     = copiar os arquivos e coloca na pasta de saída mesmo não sendo .js ou .ts, podendo ser html, etc...
--no-copy-ignore = não copiar os arquivos que definimos no ignore: ['**/*.spec.ts'] do babel.config.js

"scripts": {
  "build": "babel src --extensions \".js,.ts\" --out-dir dist  --copy-files --no-copy-ignore"
}
~~~

#### Install Typeorm, .env and ormconfig.js
~~~bash
yarn add typeorm pg reflect-metadata uuidv4 dotenv && yarn add -D @types/dotenv
~~~
.env
~~~.env
DATABASE_URL = postgres://postgres:root@localhost:5432/task
TYPEORM_ENTITIES = src/models/**/*.ts
TYPEORM_MIGRATIONS = src/database/migrations/**/*.ts
TYPEORM_SUBESCRIBERS = src/subscribers/**/*.ts
TYPEORM_ENTITIES_DIR = src/models
TYPEORM_MIGRATIONS_DIR = src/database/migrations
TYPEORM_SUBESCRIBERS_DIR = src/subscribers
~~~
ormconfig.js
~~~js
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [process.env.TYPEORM_ENTITIES || 'dist/models/**/*.js'],
  migrations: [
    process.env.TYPEORM_MIGRATIONS || 'dist/database/migrations/**/*.js',
  ],
  subcribers: [process.env.TYPEORM_SUBCRIBERS || 'dist/subcribers/**/*.js'],
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    subscribersDir: process.env.TYPEORM_SUBESCRIBERS_DIR,
  },
};
~~~
##### loader variable env.ts
~~~
...
  |-- src
    |-- config
      |-- env.ts
~~~
env.ts
~~~ts
import { config } from 'dotenv';
import { resolve } from 'path';

config({
  path: resolve(__dirname, '..', '..', '.env'),
});
~~~
##### Create Connection
~~~
...
  |-- src
    |-- database
      |-- index.ts
~~~
~~~ts
import 'reflect-metadata';
import { createConnection } from 'typeorm';

export default (async () => {
  return createConnection();
})();
~~~
##### Script typeorm
~~~json
"scripts": {
     "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js --config ./ormconfig.js "
}
~~~
##### CLI Typeorm
~~~
--rodar migrations
yarn typeorm migration:run

--criar uma migration
yarn typeorm migration:create -- -n createUser

--gerar migrations a partir das model
yarn typeorm migration:generate -- -n createUser

--reverte uma magration
yarn typeorm migration:revert


--criar uma model
yarn typeorm entity:create -- -n User
~~~



