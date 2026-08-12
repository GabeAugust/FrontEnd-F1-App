# develop

## Resumo Executivo

`develop` é a branch de integração e a branch padrão remota (`origin/HEAD -> origin/develop`). No commit `e142c98`, ela reúne o scaffold React/Vite/TypeScript, ambiente Docker, reorganização inicial de arquivos, Tailwind CSS, Header, hero, temas, roteamento e páginas temporárias. Quatro Pull Requests foram mesclados nela e duas alterações relevantes foram feitas diretamente: adoção do Tailwind (`17c8025`) e correção do favicon/remoção de assets (`e142c98`).

Em relação ao ancestral comum com `main` (`cda5851`), `develop` possui 14 commits exclusivos e 32 arquivos alterados. `main` permanece com apenas um README vazio; portanto, `develop` representa o estado funcional atual do projeto.

## Objetivo

Servir como linha central de integração para as entregas incrementais do F1 Universe antes de uma promoção para `main`. O objetivo acumulado é fornecer um ambiente reproduzível e uma arquitetura inicial de apresentação sobre a qual implementar dados e páginas definitivas.

Pull Requests integrados:

- [#1 — feat: project structure](https://github.com/GabeAugust/FrontEnd-F1-App/pull/1)
- [#2 — feat: add docker files(compose,ignore and dockerfile)](https://github.com/GabeAugust/FrontEnd-F1-App/pull/2)
- [#3 — feat: add folders in src](https://github.com/GabeAugust/FrontEnd-F1-App/pull/3)
- [#4 — Feature/header](https://github.com/GabeAugust/FrontEnd-F1-App/pull/4)

## Alterações Realizadas

### Arquivos Modificados

- Infraestrutura: `.dockerignore`, `.gitignore`, `Dockerfile`, `compose.yaml`.
- Metadados/build: `package.json`, `package-lock.json`, `index.html`, `vite.config.ts`.
- Qualidade/tipagem: `eslint.config.js`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`.
- Composição: `src/main.tsx`, `src/app/App.tsx`, `src/app/App.css`, `src/app/RootLayout.tsx`, `src/app/router.tsx`.
- UI: `src/components/Header.Tsx`, `src/styles/global.css`.
- Features: Home, pilotos, detalhes de piloto, equipes, circuitos, temporadas, resultados, notícias e 404.
- Assets finais: `src/assets/f1.png` e `src/assets/f1-bg.jpg`.
- Documentação existente: `README.MD` (vazio no estado analisado).

Lista completa de 32 caminhos no diff:

- `.dockerignore`
- `.gitignore`
- `Dockerfile`
- `README.MD`
- `compose.yaml`
- `eslint.config.js`
- `index.html`
- `package-lock.json`
- `package.json`
- `src/app/App.css`
- `src/app/App.tsx`
- `src/app/RootLayout.tsx`
- `src/app/router.tsx`
- `src/assets/f1-bg.jpg`
- `src/assets/f1.png`
- `src/components/Header.Tsx`
- `src/features/circuits/Circuits.tsx`
- `src/features/drivers/DriverDetails.tsx`
- `src/features/drivers/Drivers.tsx`
- `src/features/home/Home.tsx`
- `src/features/news/Noticias.tsx`
- `src/features/not-found/NotFound.tsx`
- `src/features/results/Results.tsx`
- `src/features/seasons/Seasons.tsx`
- `src/features/teams/Teams.tsx`
- `src/index.css`
- `src/main.tsx`
- `src/styles/global.css`
- `tsconfig.app.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`

### Funcionalidades Adicionadas

- Toolchain React 19, TypeScript 6 e Vite 8.
- Execução de desenvolvimento com Docker Compose e Node 22 Alpine.
- Tailwind CSS 4 integrado ao plugin oficial do Vite.
- Header fixo e responsivo ao scroll.
- Hero com identidade visual e gradientes por tema.
- Alternância entre tema claro e escuro.
- Navegação SPA e realce da rota ativa.
- Rotas estáticas, rota dinâmica de piloto e fallback 404.
- Páginas temporárias organizadas por feature.
- Favicon alterado para o logo F1.

### Refatorações

- `App` movido para `src/app`.
- `App` reduzido a composição de rotas.
- Shell e tema centralizados em `RootLayout`.
- Menu centralizado em uma coleção de dados.
- Cores e overlays convertidos em tokens semânticos reutilizáveis.
- Assets padrão do template removidos.

### Correções

- Vite configurado para acesso externo no container.
- Header recebe estado ativo correto por `NavLink`.
- Listener de scroll possui cleanup.
- Favicon vazio foi substituído por `./src/assets/f1.png` no commit final.
- Assets públicos de template não utilizados foram removidos.

## Análise Técnica

### Histórico e integração

O histórico contém 14 commits exclusivos após `cda5851`: quatro commits de merge, os commits das quatro feature branches, a adoção direta de Tailwind e a correção final de favicon. O uso de merge commits preserva a origem dos PRs e facilita rastrear cada incremento.

### Runtime e build

`package.json` disponibiliza `dev`, `build`, `lint` e `preview`. O build executa verificação TypeScript antes do Vite. `vite.config.ts` registra React e Tailwind, expõe `0.0.0.0:5173` e habilita polling a cada 300 ms para compatibilidade com file watching no ambiente Docker/Windows.

### Execução conteinerizada

`Dockerfile` instala dependências com `npm ci`. `compose.yaml` monta o código em `/app`, protege `/app/node_modules` em volume nomeado e publica 5173. É um ambiente de desenvolvimento, não uma imagem de produção.

### Composição React

`main.tsx` monta `BrowserRouter`; `App.tsx` renderiza `AppRoutes`; `router.tsx` associa URLs às páginas; `RootLayout` concentra tema, Header e `Outlet`. Essa sequência torna explícita a distinção entre bootstrap, mapa de navegação, shell e conteúdo.

### UI e tema

Tailwind `@theme` registra tokens; `dark-theme` e `light-theme` redefinem propriedades CSS herdadas. Header, textos e hero consomem nomes semânticos. O botão de tema altera estado em memória, enquanto o scroll determina qual variante de Header é renderizada.

### Estado das features

Home apresenta o hero e uma seção vazia. As páginas de pilotos, equipes, circuitos, temporadas, resultados e notícias são placeholders. `DriverDetails` exibe o parâmetro da URL; não há dataset/API. Busca e perfil são controles sem ação. O produto entrega navegação e aparência inicial, não conteúdo final.

Métricas do diff contra o ancestral comum:

- 14 commits exclusivos;
- 32 arquivos alterados;
- 4.031 inserções reportadas, dominadas pelo lockfile;
- 4 PRs mesclados;
- 0 arquivos de teste.

## Conceitos Aplicados

### Integração contínua por branch de desenvolvimento

`develop` agrega features revisadas por PR e preserva merges explícitos. O benefício é ter um ponto comum para validação antes de promover uma release. Não existe, contudo, workflow CI configurado; “integração” aqui descreve o fluxo Git, não automação.

### Single Page Application

React e React Router mantêm uma única aplicação no navegador, trocando páginas pelo estado da URL sem reload completo.

### Roteamento declarativo e layout compartilhado

Rotas são centralizadas, e `Outlet` injeta páginas em `RootLayout`. O Header e o tema não precisam ser duplicados.

### Organização por feature

Cada domínio de tela possui pasta própria. Isso aumenta coesão de apresentação e prepara crescimento modular, sem caracterizar DDD completo.

### Design system inicial

Tokens de marca, superfícies, textos, bordas, estados, raios, sombras e overlays são definidos em CSS. Temas substituem valores sem mudar componentes consumidores.

### Hooks e fluxo unidirecional

`useState` e `useEffect` controlam tema/scroll; props levam estado e ação do layout ao Header. Cleanup do evento evita vazamento.

### Docker e reprodutibilidade

Node 22 Alpine, `npm ci`, lockfile e Compose reduzem variação do ambiente. Bind mount e volume de dependências equilibram hot reload e isolamento.

### Qualidade estática

TypeScript, ESLint, regras de hooks e build tipado fornecem barreiras antes da execução. Não substituem testes comportamentais.

### Acessibilidade inicial

Elementos semânticos, `aria-label`, texto alternativo e links reais fornecem uma base melhor para teclado e tecnologias assistivas.

## Arquitetura Impactada

```text
Infraestrutura
  Dockerfile + Compose
  Node 22 + npm ci
  Vite + TypeScript + ESLint + Tailwind

Aplicação
  main.tsx
    BrowserRouter
      App
        AppRoutes
          RootLayout
            Header
            Outlet
              features/*

Apresentação
  global.css
    tokens
    temas
    classes de componente
  assets F1
```

Não há backend, cliente HTTP, cache, autenticação, autorização, persistência ou camada de domínio. Logo, conceitos como REST, GraphQL, Repository, CQRS, JWT e DI não foram encontrados.

## Fluxo da Solução

1. Docker opcionalmente inicializa o Vite em Node 22.
2. O navegador carrega `index.html` e `src/main.tsx`.
3. React monta a aplicação dentro de `BrowserRouter`.
4. `AppRoutes` seleciona a feature pela URL.
5. `RootLayout` envolve a feature com tema e Header.
6. `NavLink` navega e marca o item ativo.
7. `Outlet` mostra a página correspondente.
8. O tema troca tokens CSS na raiz.
9. O scroll troca a classe visual do Header.
10. URLs não reconhecidas são direcionadas ao 404.

## Dependências Adicionadas ou Alteradas

Runtime/UI:

- `react` `^19.2.8`
- `react-dom` `^19.2.8`
- `react-router` `^8.3.0`
- `lucide-react` `^1.31.0`
- `tailwindcss` `^4.3.3`
- `@tailwindcss/vite` `^4.3.3`

Build/qualidade:

- Vite 8.2, TypeScript 6, ESLint 10 e plugins.
- React Compiler/Babel existiam no scaffold inicial; no tip atual, `vite.config.ts` usa os plugins React e Tailwind, sem registrar o preset Babel do scaffold.

Infraestrutura:

- `node:22-alpine`
- Docker Compose

## Testes

### Como validar

```bash
docker compose run --rm frontend npm run lint
docker compose run --rm frontend npm run build
docker compose up
```

Depois:

- abrir `http://localhost:5173`;
- navegar por todas as rotas;
- testar `/pilotos/max-verstappen`;
- testar URL inexistente;
- alternar tema;
- rolar a página;
- recarregar rotas diretamente;
- testar voltar/avançar do navegador.

### Cenários testados

- `npm run build`: executado com sucesso em container temporário; Vite transformou 1.865 módulos e gerou `dist`.
- `npm run lint`: executado com sucesso em container temporário, sem erros.
- Histórico, PRs, árvores e diffs: inspecionados diretamente pelo Git/GitHub CLI.
- Não há testes unitários, integração ou E2E no repositório.
- A validação visual completa em múltiplos viewports não foi automatizada nesta análise.

## Benefícios Obtidos

- Ambiente de desenvolvimento reproduzível.
- Primeira versão navegável do produto.
- Separação clara entre bootstrap, rotas, layout e features.
- Temas extensíveis por tokens.
- Menor duplicação no Header e páginas.
- Base de tipagem e lint funcional.
- Histórico de integração rastreável por PR.

## Possíveis Melhorias Futuras

- Promover `develop` para `main` por release/PR após critérios claros.
- Implementar conteúdo e dados reais para cada feature.
- Adicionar camada de API tipada e gerenciamento de estado remoto.
- Persistir tema e respeitar preferência do sistema.
- Implementar responsividade do Header e menu móvel.
- Adicionar Vitest, React Testing Library e Playwright/Cypress.
- Configurar CI para instalação, lint, build e testes.
- Criar imagem de produção multi-stage.
- Adicionar lazy loading por rota e otimização de imagens.
- Criar documentação raiz e ADRs para decisões arquiteturais.

## Riscos e Observações

- `main` não representa o produto; fluxo de release ainda não está concluído.
- Páginas são temporárias e controles de pesquisa/perfil não funcionam.
- Não há testes automatizados nem CI/CD.
- Tema não persiste após refresh.
- Polling de 300 ms pode aumentar consumo de CPU.
- Transição aplicada globalmente a todos os elementos pode afetar performance e acessibilidade.
- `Header.Tsx` usa capitalização de extensão não convencional e pode falhar em ambientes Linux case-sensitive.
- O favicon aponta para um asset dentro de `src` diretamente pelo HTML; importar/copiar via `public` ou usar caminho processado pelo Vite seria mais robusto para alguns cenários.
- Docker atual é somente desenvolvimento e executa como usuário padrão da imagem.
- README raiz permanece vazio.

## Resumo para Stakeholders

`develop` contém a primeira versão funcional da experiência F1 Universe: ambiente padronizado, identidade visual, temas e navegação entre todas as áreas planejadas. Ela ainda usa páginas de demonstração e não possui dados reais, testes automatizados ou processo de produção. O valor atual é uma fundação consistente que reduz o custo das próximas telas; a prioridade agora é transformar o esqueleto em produto validado e promover uma release estável para `main`.
