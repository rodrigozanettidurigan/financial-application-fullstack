# Financial Web

Frontend Angular para um sistema financeiro fullstack integrado a uma API Spring Boot com autenticação OAuth2, JWT e controle de permissões.

## Tecnologias

- Angular
- TypeScript
- SCSS
- RxJS
- Angular Router
- Reactive Forms
- OAuth2 Authorization Code Flow with PKCE
- JWT
- Spring Boot API

## Funcionalidades

- Login com OAuth2 + PKCE
- Listagem de categorias
- Listagem de pessoas
- Pesquisa de lançamentos
- Filtro por descrição e data
- Paginação
- Cadastro de lançamento
- Edição de lançamento
- Exclusão de lançamento
- Controle visual por permissões do usuário
- Interceptor para envio de Bearer Token
- Guard para proteção de rotas

## Usuários de teste

| Usuário | Senha | Perfil |
|---|---|---|
| admin@email.com | admin | Acesso completo |
| maria@email.com | maria | Acesso limitado |

## Como rodar

### Backend

```bash
cd financial-application
./mvnw spring-boot:run