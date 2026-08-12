# Visão Geral do Projeto

O FrontEnd F1 App (F1 Universe) é uma Single Page Application em construção para organizar informações de Fórmula 1. O estado integrado em `develop` utiliza React 19, TypeScript 6, Vite 8, Tailwind CSS 4, React Router 8 e Lucide React. O desenvolvimento pode ser executado em Docker Compose com Node 22 Alpine.

O repositório começou apenas com `README.MD`; depois recebeu scaffold técnico, ambiente Docker, organização inicial de pastas, sistema visual, Header, temas e navegação. O produto atual é um esqueleto navegável: Home possui hero; demais páginas são temporárias; não existem dados reais, backend, autenticação ou testes automatizados.

Escopo da análise:

- snapshot em 12 de agosto de 2026;
- todas as branches locais e remotas disponíveis no repositório;
- referências remotas duplicadas consolidadas por branch lógica;
- histórico Git, diffs, árvores, dependências, configurações e código;
- metadados públicos dos Pull Requests consultados pelo GitHub CLI;
- `refs/stash` excluída por não ser branch;
- nomes com `/` normalizados com `-` nos arquivos Markdown.

## Branches analisadas

| Branch | Tip analisado | Base do diff | Papel | PR associado | Documento |
|---|---:|---:|---|---|---|
| `main` | `79df3bb` | `cda5851` | Branch principal, ainda sem aplicação | Não encontrado | [README-main.md](./README-main.md) |
| `develop` | `e142c98` | `cda5851` | Integração funcional atual | PRs #1 a #4 recebidos | [README-develop.md](./README-develop.md) |
| `docs/documentation-branchs` | `e142c98` antes dos docs | `origin/develop` | Documentação por branch | Não encontrado | [README-docs-documentation-branchs.md](./README-docs-documentation-branchs.md) |
| `feature/project-structure` | `5fb7fb8` | `cda5851` | Scaffold React/Vite/TypeScript | [#1](https://github.com/GabeAugust/FrontEnd-F1-App/pull/1) | [README-feature-project-structure.md](./README-feature-project-structure.md) |
| `feature/docker-compose` | `2e48d75` | primeiro pai do merge #2 | Ambiente Docker de desenvolvimento | [#2](https://github.com/GabeAugust/FrontEnd-F1-App/pull/2) | [README-feature-docker-compose.md](./README-feature-docker-compose.md) |
| `feature/add-page-packages` | `b5001ec` | primeiro pai do merge #3 | Organização inicial de `App` | [#3](https://github.com/GabeAugust/FrontEnd-F1-App/pull/3) | [README-feature-add-page-packages.md](./README-feature-add-page-packages.md) |
| `feature/header` | `1691f5b` | primeiro pai do merge #4 | UI, temas, layout, rotas e páginas | [#4](https://github.com/GabeAugust/FrontEnd-F1-App/pull/4) | [README-feature-header.md](./README-feature-header.md) |

`origin/HEAD` aponta para `origin/develop`. Branches locais que possuem equivalente remoto no mesmo tip foram contabilizadas uma vez. `origin/feature/project-structure` e `origin/main` não tinham branches locais correspondentes no snapshot, mas foram incluídas.

## Linha do tempo das implementações

### 7 de agosto de 2026 — fundação

- `cda5851` — commit inicial com `README.MD`.
- `79df3bb` em `main` — README substituído por arquivo praticamente vazio.
- `5fb7fb8` — scaffold React/Vite/TypeScript, lockfile, ESLint e configurações.
- PR #1 mescla `feature/project-structure` em `develop` (`a333467`).

### 10 de agosto de 2026 — ambiente e estrutura

- `2e48d75` — Dockerfile, Compose, `.dockerignore` e Vite acessível pelo container.
- PR #2 mescla `feature/docker-compose` (`326448a`).
- `b5001ec` — move `App.tsx` e `App.css` para `src/app`.
- PR #3 mescla `feature/add-page-packages` (`d8f0f59`).
- `17c8025` — Tailwind CSS 4 e plugin Vite adicionados diretamente a `develop`.
- `530b2a8` — logo e estrutura inicial do Header.
- `169bac3` — hero/imagem de fundo e evolução visual do Header.

### 11 de agosto de 2026 — controle visual

- `cd785ae` — ícone de dark mode no Header.

### 12 de agosto de 2026 — tema, arquitetura de páginas e integração

- `c136f5b` — tokens e temas claro/escuro; ajustes no Header.
- `1691f5b` — React Router, RootLayout, páginas temporárias, rota dinâmica e 404.
- PR #4 mescla `feature/header` (`111efe2`).
- `e142c98` — favicon F1 e remoção dos SVGs públicos do template.
- `docs/documentation-branchs` parte do mesmo tip de `develop` para gerar este conjunto documental.

## Evolução arquitetural

### Estágio 0 — repositório documental

`main` e o commit inicial continham apenas README. Não havia aplicação nem build.

### Estágio 1 — toolchain frontend

`feature/project-structure` adicionou React, Vite, TypeScript, ESLint e lockfile. Os arquivos de UI estavam vazios, então o estágio criou capacidade de desenvolvimento, não produto visível.

### Estágio 2 — runtime conteinerizado

`feature/docker-compose` introduziu Node 22 Alpine, instalação determinística, bind mount, volume de `node_modules` e publicação da porta Vite.

### Estágio 3 — organização de composição

`feature/add-page-packages` criou `src/app` por meio de renomes. O benefício arquitetural só se concretizou depois, quando router e layout passaram a residir ali.

### Estágio 4 — sistema de estilos

O commit `17c8025` integrou Tailwind. Posteriormente, `global.css` ganhou design tokens, classes semânticas e overrides de tema.

### Estágio 5 — shell e navegação

`feature/header` estabeleceu a arquitetura atual:

```text
src/main.tsx
  BrowserRouter
    src/app/App.tsx
      AppRoutes
        RootLayout
          Header
          Outlet
            features/*
```

Essa divisão separa bootstrap, mapa de rotas, shell global e conteúdo por feature.

### Estágio atual — esqueleto navegável

O código integrado possui infraestrutura e navegação, mas não possui camada de dados, regras de domínio, serviços, testes ou estratégia de produção. A arquitetura atual é predominantemente de apresentação.

## Principais conceitos utilizados

### React SPA e composição de componentes

React monta uma árvore única e reutiliza Header/layout entre páginas. Componentes funcionais e props estabelecem composição e fluxo de dados descendente.

### TypeScript e qualidade estática

TypeScript verifica código antes do bundle. ESLint cobre JavaScript/TypeScript, hooks e React Refresh. Essas ferramentas detectam classes de erro, mas não validam comportamento do usuário.

### React Router declarativo

`BrowserRouter`, `Routes`, `Route`, `Outlet`, `NavLink`, `Link` e `useParams` implementam URLs, layout, estado ativo, rota dinâmica e 404 sem reload completo.

### Organização por feature

Páginas são agrupadas em `src/features/{domínio}`. Isso favorece coesão e crescimento modular. Não há entidades, aggregates ou serviços de domínio suficientes para afirmar DDD.

### Elevação de estado e hooks

Tema é mantido em `RootLayout` e passado ao Header. `useEffect` gerencia assinatura do scroll com cleanup. O fluxo permanece explícito e unidirecional.

### Design tokens e temas

Custom properties representam cores, bordas, textos, sombras e overlays. Classes `dark-theme`/`light-theme` substituem valores, e Tailwind consome tokens semânticos.

### Docker e build reproduzível

Docker Compose padroniza Node e execução. `npm ci` com lockfile estabiliza a instalação. O ambiente atual é destinado ao desenvolvimento.

### Git Flow simplificado e Pull Requests

Features partem de `develop` e retornam por PR com merge commit. `develop` funciona como integração; `main` ainda não recebeu uma release funcional.

### Acessibilidade inicial

Header/nav, links reais, botões, labels ARIA e texto alternativo fornecem uma base semântica, ainda sem auditoria completa de contraste, foco e responsividade.

Conceitos não encontrados no código: backend/API REST, GraphQL, autenticação, autorização, JWT, OAuth, banco de dados, Repository Pattern, CQRS, event-driven architecture, cache, dependency injection, CI/CD e TDD.

## Métricas

### Metodologia

- Commits são exclusivos no intervalo de análise definido para cada branch.
- Features mescladas usam o primeiro pai do merge como base, evitando contar código herdado.
- “Arquivos modificados” é o total de caminhos do diff, incluindo renomes e binários.
- Contagens de funcionalidades/refatorações são agrupamentos técnicos documentados; não são linhas de código nem story points.
- `develop` é acumulativa; seus números não devem ser somados aos das features.
- A branch de docs tinha 0 diferenças commitadas antes desta tarefa; os 8 Markdown estão no working tree até commit.

| Branch | Commits no recorte | Arquivos no diff | Funcionalidades/entregas agrupadas | Refatorações agrupadas |
|---|---:|---:|---:|---:|
| `main` | 1 | 1 | 0 | 0 |
| `feature/project-structure` | 1 | 19 | 1 | 0 |
| `feature/docker-compose` | 1 | 8 | 1 | 1 |
| `feature/add-page-packages` | 1 | 2 | 0 | 1 |
| `feature/header` | 5 | 20 | 9 | 5 |
| `develop` | 14 | 32 | 10 acumuladas | 7 acumuladas |
| `docs/documentation-branchs` | 0 antes da tarefa | 0 commitados / 8 no working tree | 1 pacote documental | 0 de código |

### Total de commits por branch

- `main`: 1 exclusivo após o ancestral comum.
- `develop`: 14 exclusivos após o ancestral comum.
- `feature/project-structure`: 1 próprio.
- `feature/docker-compose`: 1 próprio.
- `feature/add-page-packages`: 1 próprio.
- `feature/header`: 5 próprios.
- `docs/documentation-branchs`: 0 antes da geração.
- Total de commits únicos alcançáveis por `origin/main` e `origin/develop`, incluindo o commit inicial e merges: 16. Commits das features já fazem parte desse conjunto; não devem ser somados novamente.

### Total de arquivos modificados

- Maior diff: `develop`, com 32 arquivos.
- Maior feature: `feature/header`, com 20 arquivos.
- Scaffold inicial: 19 arquivos.
- Docker: 8 arquivos.
- Reorganização de `App`: 2 renomes.
- `main`: 1 arquivo.
- Documentação: 8 novos Markdown no working tree.

### Funcionalidades implementadas

No estado integrado, foram identificados dez incrementos agrupados:

1. toolchain React/Vite/TypeScript;
2. ambiente Docker de desenvolvimento;
3. Tailwind CSS;
4. Header com navegação e ações;
5. comportamento visual por scroll;
6. hero e assets F1;
7. tema claro/escuro;
8. roteamento SPA;
9. páginas temporárias, rota dinâmica e 404;
10. favicon do produto.

### Refatorações realizadas

Sete refatorações/limpezas acumuladas foram identificadas:

1. remoção de assets do template;
2. movimentação de `App` para `src/app`;
3. redução de `App` à composição de rotas;
4. extração de `RootLayout`;
5. menu dirigido por dados;
6. centralização de tokens/temas;
7. limpeza final de assets públicos e favicon.

### Pull Requests e testes

- 4 PRs, todos mesclados em `develop`.
- 0 arquivos de testes unitários, integração ou E2E.
- Build e lint do tip integrado: aprovados em containers temporários.

## Mapa de conhecimento do projeto

```text
FrontEnd-F1-App
|
|-- Governança Git
|   |-- main: sem aplicação funcional
|   |-- develop: integração atual
|   |-- feature/*: incrementos mesclados por PR
|   `-- docs/*: documentação técnica
|
|-- Infraestrutura
|   |-- Dockerfile: Node 22 Alpine
|   |-- compose.yaml: porta + volumes
|   `-- .dockerignore
|
|-- Toolchain
|   |-- Vite
|   |-- TypeScript
|   |-- ESLint
|   `-- Tailwind CSS
|
|-- Bootstrap e shell
|   |-- src/main.tsx
|   |-- src/app/App.tsx
|   |-- src/app/router.tsx
|   `-- src/app/RootLayout.tsx
|
|-- Componentes globais
|   `-- src/components/Header.Tsx
|
|-- Features
|   |-- home
|   |-- drivers
|   |-- teams
|   |-- circuits
|   |-- seasons
|   |-- results
|   |-- news
|   `-- not-found
|
|-- Sistema visual
|   |-- src/styles/global.css
|   |-- design tokens
|   |-- light/dark themes
|   `-- assets F1
|
`-- Lacunas
    |-- dados/API
    |-- testes
    |-- CI/CD
    |-- responsividade completa
    |-- persistência de preferências
    `-- produção/deploy
```

## Próximos passos recomendados

1. Normalizar `Header.Tsx` para `Header.tsx` com rename Git que funcione em filesystem case-sensitive.
2. Criar testes mínimos para router, tema, Header e 404.
3. Configurar CI com `npm ci`, lint, build e testes.
4. Implementar design responsivo do Header/menu.
5. Persistir tema e respeitar `prefers-color-scheme`/`prefers-reduced-motion`.
6. Definir contratos de dados e uma camada de API tipada.
7. Implementar primeiro fluxo vertical completo, preferencialmente lista e detalhes de pilotos.
8. Adicionar estados de loading, vazio, erro e not-found de entidade.
9. Criar Dockerfile de produção multi-stage e estratégia de hosting SPA com fallback para `index.html`.
10. Promover `develop` para `main` somente após critérios de release e README raiz atualizado.
11. Automatizar markdownlint e verificação de links destes documentos.

## Dívida técnica identificada

| Prioridade | Dívida | Evidência | Impacto |
|---|---|---|---|
| Alta | `main` sem aplicação | árvore contém apenas README vazio | Branch principal não pode representar release |
| Alta | ausência de testes | nenhum arquivo de teste no tip | regressões de navegação/tema sem proteção |
| Alta | páginas sem dados | placeholders em `features/*` | produto ainda não entrega informação útil |
| Alta | ausência de CI/CD | nenhum workflow versionado | qualidade depende de execução manual |
| Média | casing `Header.Tsx` | path versionado com extensão não convencional | risco em Linux/CI case-sensitive |
| Média | Docker apenas dev | `CMD npm run dev` | inadequado para produção |
| Média | tema sem persistência | `useState(true)` em `RootLayout` | preferência perdida no refresh |
| Média | menu não responsivo | layout horizontal fixo | experiência ruim em telas pequenas |
| Média | polling agressivo | intervalo de 300 ms no Vite | maior uso de CPU |
| Média | transições globais | seletor universal em `global.css` | custo visual/performance e motion não solicitado |
| Média | carregamento eager | imports diretos de todas as páginas | bundle cresce com novas features |
| Baixa | `.dockerignore` com typo | `Dockefile` | contexto contém arquivo não intencional |
| Baixa | favicon apontando para `src` | `index.html` referencia asset de fonte | estratégia menos robusta que asset público/importado |
| Baixa | README raiz vazio | blob sem conteúdo | onboarding depende de conhecimento externo |

## Resumo executivo geral

O projeto avançou rapidamente de uma base vazia para uma aplicação React navegável, com ambiente Docker, identidade visual, temas e estrutura modular. A arquitetura atual é adequada para continuar aprendendo e construir as páginas: bootstrap, rotas, layout e features estão separados, e o sistema visual usa tokens reutilizáveis.

O valor entregue até agora é principalmente fundacional. A interface já demonstra direção de produto, mas ainda não entrega dados reais e carece de testes, CI, responsividade completa e estratégia de produção. A principal recomendação é completar um fluxo de negócio ponta a ponta — lista e detalhes de pilotos — enquanto se adicionam testes e automação. Depois disso, `develop` poderá ser preparada para uma primeira promoção responsável a `main`.
