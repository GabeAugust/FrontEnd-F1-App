# feature/docker-compose

## Resumo Executivo

A branch `feature/docker-compose` adicionou um ambiente Docker para executar o servidor de desenvolvimento Vite com Node 22, porta 5173, código montado por bind mount e dependências preservadas em volume nomeado. A entrega está no commit `2e48d75` e foi integrada em `develop` pelo [Pull Request #2](https://github.com/GabeAugust/FrontEnd-F1-App/pull/2), intitulado `feat: add docker files(compose,ignore and dockerfile)`.

Além da conteinerização, a branch configurou o Vite para escutar em `0.0.0.0`, removeu assets do template e deixou o `href` do favicon vazio — comportamento posteriormente corrigido em `develop`.

## Objetivo

Eliminar a dependência de uma instalação funcional de Node/npm no host e padronizar o ambiente de desenvolvimento. O servidor Vite precisava aceitar conexões externas ao processo do container; por isso, host e porta foram explicitados.

## Alterações Realizadas

### Arquivos Modificados

- `.dockerignore` — novo.
- `Dockerfile` — novo.
- `compose.yaml` — novo.
- `index.html` — favicon removido temporariamente.
- `vite.config.ts` — servidor exposto em `0.0.0.0:5173`.
- `src/assets/hero.png` — removido.
- `src/assets/react.svg` — removido.
- `src/assets/vite.svg` — removido.

### Funcionalidades Adicionadas

- Execução do frontend em container Node 22 Alpine.
- Inicialização simplificada por `docker compose up --build`.
- Hot reload baseado no código do host montado em `/app`.
- Publicação da porta 5173 para acesso pelo navegador.
- Volume separado para `node_modules` Linux.

### Refatorações

- Remoção de assets de exemplo que não representavam a identidade do projeto.
- Configuração do servidor Vite adaptada ao limite de rede do container.

### Correções

- O Vite deixa de escutar apenas no loopback interno e passa a aceitar conexões em `0.0.0.0`.

## Análise Técnica

O `Dockerfile` usa `node:22-alpine`, define `/app`, copia primeiro `package.json` e `package-lock.json`, executa `npm ci`, copia o restante do contexto, expõe 5173 e inicia `npm run dev`. Copiar os manifestos antes do código permite reaproveitar a camada de dependências quando apenas fontes mudam.

O `compose.yaml` cria o serviço `frontend`, constrói a imagem localmente e publica `5173:5173`. Há dois mounts:

- `.:/app`: sincroniza o código do host com o container;
- `node_modules:/app/node_modules`: impede que o bind mount esconda ou substitua dependências Linux por dependências do host.

O `vite.config.ts` adiciona `server.host = '0.0.0.0'` e `server.port = 5173`, condição necessária para alcançar o servidor através do mapeamento de portas.

Métricas do diff contra o primeiro pai do merge do PR #2:

- 1 commit;
- 8 arquivos alterados;
- 49 inserções e 4 remoções textuais, além de um asset binário removido;
- nenhuma suíte de testes adicionada.

## Conceitos Aplicados

### Docker e isolamento de ambiente

Node e npm passam a existir dentro da imagem, reduzindo diferenças de versão entre máquinas. O benefício é uma execução local mais previsível.

### Docker Compose

O serviço, build, porta, volumes e comando são declarados em YAML. Isso encapsula uma sequência extensa de argumentos Docker em uma interface simples.

### Cache de camadas

Manifestos são copiados antes do restante do projeto. Enquanto as dependências não mudarem, Docker pode reutilizar a camada produzida por `npm ci`, reduzindo tempo de rebuild.

### Bind mount e volume nomeado

O bind mount favorece edição e hot reload; o volume nomeado isola `node_modules` do sistema operacional hospedeiro. A combinação atende simultaneamente produtividade e compatibilidade binária.

### Instalação determinística

`npm ci` exige consistência entre `package.json` e `package-lock.json` e instala as versões travadas. Isso reduz variação entre ambientes.

## Arquitetura Impactada

A mudança afeta a camada de execução e desenvolvimento, não a arquitetura interna dos componentes React:

```text
Windows/host
  -> porta 5173
      -> container frontend
          -> Vite em 0.0.0.0:5173
          -> /app (código montado)
          -> /app/node_modules (volume Linux)
```

## Fluxo da Solução

1. `docker compose up --build` lê `compose.yaml`.
2. Docker constrói a imagem a partir do `Dockerfile`.
3. `npm ci` instala dependências na imagem.
4. Compose cria os mounts e publica a porta.
5. `npm run dev` inicia Vite dentro do container.
6. Vite escuta em todas as interfaces do container.
7. O navegador acessa `http://localhost:5173`.
8. Alterações no host chegam a `/app` pelo bind mount.

## Dependências Adicionadas ou Alteradas

- Imagem externa `node:22-alpine`.
- Docker Engine e Docker Compose tornam-se pré-requisitos do fluxo conteinerizado.
- Nenhum pacote npm foi adicionado nesta branch.

## Testes

### Como validar

```bash
docker compose build
docker compose up
docker compose exec frontend npm run lint
docker compose exec frontend npm run build
```

Abrir `http://localhost:5173`, editar um arquivo em `src` e confirmar que o container detecta a alteração. Nesta etapa histórica, a UI ainda era vazia, então o teste principal é infraestrutura e resposta do servidor.

### Cenários testados

- Dockerfile, Compose, mounts e configuração Vite inspecionados no commit.
- Relação entre porta publicada e `server.host` verificada estaticamente.
- A branch histórica não foi executada isoladamente durante esta análise.
- Não existem testes automatizados versionados na branch.

## Benefícios Obtidos

- Ambiente Node padronizado.
- Menor dependência do npm instalado no Windows.
- Instalação reprodutível com `npm ci`.
- Edição local com execução Linux.
- Comando único para subir o frontend.

## Possíveis Melhorias Futuras

- Criar `Dockerfile` multi-stage de produção, gerando `dist` e servindo por Nginx/Caddy.
- Adicionar `healthcheck` ao serviço.
- Fixar a imagem por versão patch ou digest para maior reprodutibilidade.
- Configurar usuário não-root em cenários de produção.
- Adicionar `restart` somente se houver necessidade operacional.
- Documentar Docker Desktop, WSL2 e virtualização no README raiz.
- Avaliar `watch.usePolling` apenas para hosts que realmente precisem, pois polling aumenta CPU.

## Riscos e Observações

- O container executa o servidor de desenvolvimento; não é uma imagem de produção.
- `.dockerignore` contém `Dockefile`, com grafia incorreta, então `Dockerfile` não é ignorado. Isso não impede o build, mas revela inconsistência.
- O favicon ficou com `href=""`, podendo gerar requisição incorreta; isso só foi corrigido posteriormente em `develop`.
- Não há healthcheck nem testes de container.
- Bind mounts em Windows/WSL2 podem apresentar latência ou falhas de file watching.
- O uso de `container_name` reduz flexibilidade para escalar múltiplas réplicas do mesmo serviço.

## Resumo para Stakeholders

A entrega tornou o ambiente de desenvolvimento portátil: a equipe pode iniciar o frontend com Docker sem depender da configuração local de Node. Isso reduz problemas de máquina e acelera onboarding, embora a imagem criada seja voltada apenas para desenvolvimento e ainda precise de uma estratégia própria para produção.
