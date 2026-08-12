# feature/header

## Resumo Executivo

A branch `feature/header` transformou a fundação técnica em uma primeira aplicação navegável do F1 Universe. Em cinco commits, foram adicionados Header, identidade visual, hero, comportamento por scroll, temas claro/escuro, ícones, React Router, layout compartilhado e páginas temporárias por feature. A branch foi integrada em `develop` pelo [Pull Request #4](https://github.com/GabeAugust/FrontEnd-F1-App/pull/4), intitulado `Feature/header`.

O resultado ainda é um esqueleto de produto: Home tem imagem e gradientes; as demais rotas apresentam placeholders; busca e perfil não executam ações. Mesmo assim, a branch estabelece a arquitetura de navegação e os tokens visuais sobre os quais as páginas reais podem evoluir.

## Objetivo

Entregar a primeira camada visual reutilizável e permitir navegação SPA entre os domínios previstos no design: Home, pilotos, equipes, circuitos, temporadas, resultados e notícias. Também buscou suportar tema claro/escuro e adaptar o Header quando o usuário sai do topo da página.

Sequência comprovada pelos commits:

1. `530b2a8` — logo e estrutura inicial do Header;
2. `169bac3` — Header e imagem de fundo do hero;
3. `cd785ae` — ícone de dark mode;
4. `c136f5b` — temas claro/escuro e correções no Header;
5. `1691f5b` — páginas temporárias e rotas.

## Alterações Realizadas

### Arquivos Modificados

- `package.json`
- `package-lock.json`
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
- `src/main.tsx`
- `src/styles/global.css`
- `vite.config.ts`

### Funcionalidades Adicionadas

- Header fixo com logo, menu, pesquisa, tema e perfil.
- Mudança visual do Header após 20 pixels de scroll.
- Tema escuro e claro baseado em tokens CSS.
- Hero responsivo ao tema, com imagem e gradientes laterais/inferiores.
- Navegação client-side com estado ativo no menu.
- Rotas para Home, pilotos, equipes, circuitos, temporadas, resultados e notícias.
- Rota dinâmica `pilotos/:driverId` com leitura por `useParams`.
- Página coringa 404 com retorno para a Home.
- Placeholders consistentes para orientar implementação futura.

### Refatorações

- `App.tsx` foi reduzido a um ponto fino que apenas renderiza `AppRoutes`.
- Tema e shell compartilhado foram movidos para `RootLayout`.
- Header passou a receber estado/ação de tema por props.
- Itens do menu foram convertidos em dados (`menuItems`) e renderizados por `map`.
- Estilos foram centralizados em tokens semânticos e classes de componente.

### Correções

- O Header deixa de ser repetido por página e passa a viver no layout comum.
- Estado ativo do menu usa `NavLink`, em vez de depender do pseudoestado CSS de clique.
- Listener de scroll é removido no cleanup do `useEffect` e registrado como passivo.
- Logo é importado como asset do módulo, em vez de depender de caminho relativo textual no HTML.

## Análise Técnica

`src/main.tsx` envolve a aplicação com `BrowserRouter`. `src/app/router.tsx` declara rotas aninhadas sob `RootLayout`. O layout renderiza `Header` e `Outlet`; logo, a navegação troca somente o conteúdo da página, preservando o shell e o estado de tema durante mudanças internas.

`RootLayout` mantém `isDark` com `useState` e passa `isDark` e `onToggleTheme` ao Header. A classe aplicada em `<main>` alterna entre `dark-theme` e `light-theme`. As duas classes redefinem custom properties como `--color-background`, `--color-heading`, `--hero-side-overlay` e `--hero-bottom-overlay`. Componentes consomem nomes semânticos (`bg-background`, `text-heading`) em vez de valores específicos de cada tema.

O Header usa `useEffect` para observar `window.scrollY`. Acima de 20 pixels, troca de `header` para `header-scrolled`, adicionando superfície, blur e sombra. `NavLink` fornece `isActive`; a Home usa `end` para não ficar ativa em todas as URLs. Botões têm `aria-label` e o menu está dentro de `nav` com rótulo.

O router inclui:

```text
/                         Home
/pilotos                  Drivers
/pilotos/:driverId        DriverDetails
/equipes                   Teams
/circuitos                 Circuits
/temporadas                Seasons
/resultados                Results
/noticias                  News
/*                         NotFound
```

As features, exceto Home e detalhes de piloto, são páginas temporárias. `DriverDetails` mostra diretamente o slug recebido; ainda não existe busca em API ou dataset.

Métricas contra o primeiro pai do merge do PR #4:

- 5 commits;
- 20 arquivos alterados;
- 562 inserções e 31 remoções, além de dois assets binários;
- 9 componentes/páginas de feature criados;
- nenhuma suíte de testes automatizados.

## Conceitos Aplicados

### Roteamento SPA declarativo

`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `Outlet` e `useParams` implementam navegação sem reload. O benefício é manter estado do shell, permitir URLs compartilháveis e separar cada tela em um componente próprio.

### Layout Route e composição

`RootLayout` atua como shell compartilhado. Header e tema ficam fora das páginas e `Outlet` representa o conteúdo variável. Isso reduz duplicação e centraliza responsabilidades globais.

### Organização por feature

As páginas são agrupadas por domínio em `src/features`. A estrutura melhora descoberta e prepara proximidade entre página, componentes e lógica futura de cada domínio. Não há evidência de DDD completo: são agrupamentos de apresentação, sem entidades ou regras de domínio implementadas.

### Elevação de estado

O tema é mantido em `RootLayout`, ancestral comum do Header e das páginas. O Header recebe valor e callback por props. Isso mantém fluxo unidirecional e impede que o controle visual fique isolado em um componente sem afetar o restante da aplicação.

### Design tokens com CSS custom properties

`global.css` define cores, bordas, textos, feedback, raios, sombras e overlays com nomes semânticos. Cada tema redefine os mesmos tokens. O benefício é trocar aparência sem espalhar condicionais pelo JSX.

### Tailwind CSS e componentes semânticos

`@theme` expõe tokens ao Tailwind e `@apply` agrupa utilitários em classes como `header`, `theme-toggle` e `temporary-page`. Isso reduz repetição nos componentes, embora exija disciplina para não recriar uma folha CSS monolítica.

### Hooks e gerenciamento de ciclo de vida

`useState` controla tema e scroll; `useEffect` registra e remove o listener. O cleanup evita acumular listeners em remontagens, e `passive: true` comunica que o handler não bloqueia a rolagem.

### Acessibilidade semântica inicial

Foram utilizados `header`, `nav`, `ul`, `button`, `aria-label` e `alt`. `NavLink` preserva comportamento de link, teclado e abertura em nova aba melhor que navegação imperativa em cliques comuns.

## Arquitetura Impactada

A branch estabelece a arquitetura atual da camada de apresentação:

```text
main.tsx
  BrowserRouter
    App
      AppRoutes
        RootLayout
          Header
          Outlet
            Feature Page

global.css
  @theme tokens
  dark-theme/light-theme overrides
  component classes
```

O impacto é significativo: a composição deixa de estar concentrada em `App` e passa a ter router, layout e features explícitos. Não há ainda camada de API, estado remoto, domínio ou persistência.

## Fluxo da Solução

1. `main.tsx` cria a raiz React e disponibiliza contexto de roteamento.
2. `App` renderiza o mapa de rotas.
3. O React Router seleciona uma rota conforme a URL.
4. `RootLayout` aplica o tema atual e renderiza o Header.
5. A página selecionada aparece no `Outlet`.
6. `NavLink` atualiza a URL sem reload e recebe estado ativo.
7. O botão de tema alterna `isDark`; a classe raiz redefine os tokens herdados.
8. Ao rolar mais de 20 pixels, o Header recebe fundo, blur e sombra.
9. Em `/pilotos/:driverId`, `useParams` fornece o identificador da URL.
10. URLs desconhecidas chegam à página 404.

## Dependências Adicionadas ou Alteradas

- `lucide-react` `^1.31.0`: ícones de sol, lua, busca e usuário.
- `react-router` `^8.3.0`: roteamento, links, layout e parâmetros de URL.
- `package-lock.json`: atualizado para registrar a árvore das novas dependências.
- Tailwind já existia na base da branch e é amplamente utilizado, mas não foi introduzido por este PR.

## Testes

### Como validar

Com Docker:

```bash
docker compose run --rm frontend npm run lint
docker compose run --rm frontend npm run build
docker compose up
```

Validar no navegador:

1. Abrir `/`, `/pilotos`, `/equipes`, `/circuitos`, `/temporadas`, `/resultados` e `/noticias`.
2. Confirmar destaque do menu ativo.
3. Abrir `/pilotos/max-verstappen` e confirmar leitura do slug.
4. Abrir uma URL inexistente e confirmar 404.
5. Alternar tema e observar fundo, texto, Header e gradientes.
6. Rolar mais de 20 pixels e observar o Header.
7. Usar voltar/avançar do navegador.

### Cenários testados

- No tip de integração `develop`, `npm run build` e `npm run lint` foram executados com sucesso em containers temporários durante a análise.
- As rotas e componentes foram verificados no código versionado da branch.
- O tip histórico `feature/header` não foi executado separadamente; seu código de aplicação coincide com o integrado, mas `develop` inclui ainda uma correção posterior de favicon.
- Não existem testes unitários, de integração ou end-to-end versionados.

## Benefícios Obtidos

- Primeira experiência navegável do produto.
- Shell consistente entre páginas.
- Temas centralizados e extensíveis.
- URLs semânticas e rota dinâmica.
- Menor duplicação no menu e nas páginas temporárias.
- Base clara para implementar features reais sem reescrever navegação.
- Melhor acessibilidade em comparação com links sem destino.

## Possíveis Melhorias Futuras

- Persistir tema em `localStorage` e respeitar `prefers-color-scheme`.
- Extrair estado de tema para um hook/contexto se outros controles globais surgirem.
- Implementar menu responsivo para telas menores.
- Conectar pesquisa, perfil e páginas a dados reais.
- Validar `driverId` e renderizar 404 quando o piloto não existir.
- Adicionar lazy loading por rota.
- Criar testes com Vitest/React Testing Library e testes E2E para navegação/tema.
- Respeitar `prefers-reduced-motion` e limitar transições globais.
- Otimizar/comprimir `f1-bg.jpg` e fornecer variantes responsivas.
- Adicionar foco visível e revisar contraste nos dois temas.

## Riscos e Observações

- O tema volta ao escuro após refresh; não há persistência.
- Busca e perfil são apenas botões visuais.
- Páginas são placeholders e não entregam dados de Fórmula 1.
- Todas as rotas são importadas de forma eager, aumentando o bundle conforme crescerem.
- A regra global de transição em `*`, `*::before` e `*::after` pode aumentar custo de renderização e animar propriedades indesejadas.
- `watch.usePolling` no Vite melhora compatibilidade com Docker/Windows, mas pode elevar CPU.
- O arquivo está versionado como `src/components/Header.Tsx`; em sistemas Linux case-sensitive, a extensão com `T` maiúsculo pode não ser resolvida como `.tsx` por todas as ferramentas. Recomenda-se normalizar para `Header.tsx` em um rename Git explícito.
- Não há error boundary, carregamento, dados remotos ou testes automatizados.

## Resumo para Stakeholders

A entrega criou a primeira navegação real do F1 Universe, com menu, identidade visual, temas claro/escuro e páginas preparadas para receber conteúdo. O usuário já consegue circular pelo esqueleto do produto e compartilhar URLs. O próximo valor vem de substituir placeholders por dados reais, tornar a experiência responsiva e adicionar testes para proteger a evolução.
