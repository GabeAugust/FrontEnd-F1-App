# feature/project-structure

## Resumo Executivo

A branch `feature/project-structure` introduziu o scaffold técnico inicial de uma aplicação React com Vite e TypeScript. O trabalho está concentrado no commit `5fb7fb8` e foi integrado em `develop` pelo [Pull Request #1](https://github.com/GabeAugust/FrontEnd-F1-App/pull/1), intitulado `feat: project structure`.

Foram adicionados gerenciador de dependências, configurações de TypeScript, ESLint, Vite, HTML base e assets de exemplo. Os arquivos de entrada da aplicação (`src/main.tsx`, `src/App.tsx`, `src/index.css` e `src/App.css`) foram criados vazios; portanto, a branch estabelece infraestrutura, mas ainda não entrega interface visível.

## Objetivo

Criar a fundação técnica do frontend para permitir desenvolvimento incremental com React 19, TypeScript, Vite, lint e build padronizados. O escopo foi preparar o repositório, não implementar a experiência do site de Fórmula 1.

## Alterações Realizadas

### Arquivos Modificados

- `.gitignore`
- `README.MD`
- `eslint.config.js`
- `index.html`
- `package-lock.json`
- `package.json`
- `public/favicon.svg`
- `public/icons.svg`
- `src/App.css`
- `src/App.tsx`
- `src/assets/hero.png`
- `src/assets/react.svg`
- `src/assets/vite.svg`
- `src/index.css`
- `src/main.tsx`
- `tsconfig.app.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`

### Funcionalidades Adicionadas

- Scaffold de frontend baseado em React, TypeScript e Vite.
- Scripts npm para desenvolvimento, build, lint e preview.
- Integração inicial do React Compiler por preset Babel no Vite.
- Regras estáticas para TypeScript, hooks do React e React Refresh.

### Refatorações

- Não houve refatoração de código preexistente; a branch cria a base inicial.

### Correções

- Não há correção funcional identificável. A entrega é estrutural.

## Análise Técnica

O `package.json` define o projeto como privado e ESM (`"type": "module"`). Os scripts são:

- `dev`: inicia o servidor Vite;
- `build`: executa `tsc -b` e depois o bundle Vite;
- `lint`: analisa o repositório com ESLint;
- `preview`: serve localmente o bundle gerado.

As dependências de runtime são `react` e `react-dom` 19.2. As dependências de desenvolvimento incluem Vite 8.2, TypeScript 6, ESLint 10, tipos do React e plugins de React Hooks/Refresh. O `package-lock.json` fixa a árvore exata para instalações reproduzíveis.

O `vite.config.ts` registra `@vitejs/plugin-react` e `@rolldown/plugin-babel` com `reactCompilerPreset`. O `eslint.config.js` usa o formato flat config e aplica regras recomendadas para JavaScript, TypeScript, hooks e refresh. O `tsconfig.app.json` habilita `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, resolução `bundler` e `noEmit`.

Limitação relevante: os quatro arquivos centrais da UI têm zero bytes. O HTML referencia `/src/main.tsx`, mas esse módulo não monta o React. Assim, a infraestrutura pode ser processada, porém o navegador não apresenta a aplicação.

Métricas do diff contra `cda5851`:

- 1 commit;
- 19 arquivos alterados;
- 2.956 inserções, majoritariamente provenientes do lockfile e assets;
- nenhum teste adicionado.

## Conceitos Aplicados

### Single Page Application com React e Vite

O `index.html` funciona como entrada única e referencia `src/main.tsx`. Vite é responsável pelo servidor de desenvolvimento e bundle. Esse modelo favorece feedback rápido e atualização incremental da interface.

### TypeScript com verificação estática

Os arquivos `tsconfig.*.json` separam configuração da aplicação e ferramentas Node. Regras para símbolos não utilizados e `noEmit` ajudam a detectar problemas antes do bundle e deixam a emissão final a cargo do Vite.

### ESLint Flat Config

`eslint.config.js` centraliza análise de TypeScript, hooks e React Refresh. Isso melhora consistência e detecta usos incorretos de hooks durante desenvolvimento.

### Build reproduzível

O versionamento de `package-lock.json` e o script composto `tsc -b && vite build` tornam versões e etapas de build explícitas. O benefício é reduzir divergência entre ambientes.

### React Compiler

O preset `reactCompilerPreset` é aplicado via Babel no pipeline do Vite. A intenção técnica é permitir otimizações automáticas de componentes React. Como ainda não há componentes implementados, o benefício não pode ser medido nesta branch.

## Arquitetura Impactada

A branch cria a camada de apresentação e sua infraestrutura de build, mas ainda não define módulos de domínio, rotas, serviços ou componentes reais. O impacto arquitetural é fundacional:

```text
index.html
  -> src/main.tsx (vazio)
      -> futura árvore React

Vite -> transformação e bundle
TypeScript -> verificação de tipos
ESLint -> análise estática
```

## Fluxo da Solução

1. O npm lê `package.json` e instala as versões bloqueadas pelo lockfile.
2. `npm run dev` inicia o Vite.
3. O navegador carrega `index.html`.
4. O HTML solicita `src/main.tsx`.
5. Como o arquivo está vazio, nenhuma aplicação é montada no elemento `#root`.
6. Em build, TypeScript verifica o projeto e Vite produz os artefatos estáticos possíveis.

## Dependências Adicionadas ou Alteradas

- `react` e `react-dom`: runtime da interface.
- `vite`: servidor e bundler.
- `typescript`: tipagem e verificação estática.
- `@vitejs/plugin-react`: transformação React e Fast Refresh.
- `@rolldown/plugin-babel`, `@babel/core` e `babel-plugin-react-compiler`: integração do React Compiler.
- `eslint`, `typescript-eslint`, `eslint-plugin-react-hooks` e `eslint-plugin-react-refresh`: qualidade estática.
- Pacotes `@types/*`: tipagem para Node, React e React DOM.

## Testes

### Como validar

```bash
npm ci
npm run lint
npm run build
npm run dev
```

Também é necessário abrir `http://localhost:5173` e confirmar que o servidor responde. Uma tela vazia é esperada nesta branch porque `main.tsx` e `App.tsx` não possuem implementação.

### Cenários testados

- Estrutura e tamanhos dos blobs inspecionados diretamente na árvore Git.
- Scripts, dependências e configurações analisados no commit da branch.
- Não há suíte automatizada versionada.
- O commit histórico não foi executado isoladamente durante esta análise; os comandos acima representam o procedimento recomendado.

## Benefícios Obtidos

- Padronização do ambiente frontend.
- Tipagem estática e lint disponíveis desde o início.
- Instalação reproduzível por lockfile.
- Base compatível com desenvolvimento incremental e Fast Refresh.
- Separação entre configuração da aplicação e do ambiente Node.

## Possíveis Melhorias Futuras

- Implementar o bootstrap React em `src/main.tsx` e um primeiro componente em `src/App.tsx`.
- Preencher o README com requisitos e comandos.
- Remover assets de template não utilizados quando a identidade visual estiver definida.
- Adicionar testes unitários com Vitest e React Testing Library.
- Adicionar CI para `npm ci`, lint e build.
- Avaliar a necessidade real do React Compiler antes de manter a camada Babel adicional.

## Riscos e Observações

- A existência dos arquivos pode sugerir uma aplicação pronta, mas as entradas da UI estão vazias.
- `README.MD` também está vazio nesta branch.
- Não há testes nem pipeline de integração contínua.
- Assets de exemplo aumentam o repositório sem uso comprovado.
- Dependências modernas exigem versão recente do Node; isso ainda não estava documentado nesta branch.

## Resumo para Stakeholders

Esta entrega montou a oficina técnica do projeto: ferramentas, padrões de qualidade e processo de construção. Ela ainda não apresenta telas ou funcionalidades para o usuário final, mas permite que as próximas entregas sejam desenvolvidas sobre uma base padronizada e verificável.
