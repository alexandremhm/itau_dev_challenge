# Itau_dev_challenge

## Sobre a aplicação

A aplicação consiste em um sistema de avaliação de filmes, permitindo ao usuário comentar, dar likes e responder a comentários de um determinado filme. Além disso, a aplicação se comunica com a API externa [OMDb API](https://www.omdbapi.com/). O sistema de login, atenticação e seguranã é controlado por uma segunda API, aqui chamada de **Login**. Todas as informações salvas na aplicação são inseridas em um banco de dados relacional MySql.

## Requisitos para rodar a aplicação

* MySql server;
* MySql Workbench (não é obrigatório);
* [NodeJS](https://nodejs.org/en/);
* Algum gerenciador de pacotes, recomendado [npm](https://docs.npmjs.com/).

## Como executar a aplicação

* Clone o repositório e abra o diretório itau-dev_challenge;
* Com o MySql server instalado e configurado você pode seguir para a etapa de configuração das variáveis de ambiente:
  - Dentro do diretório `Business` mude o nome do arquivo `env.example` para `.env`;
  - Em seguida, abra o arquivo `.env` e configure corretamente as variáveis de ambiente, de acordo com as suas credenciais e configurações do MySql Server e a porta para o servidor que irá rodar a API Business.
  - Abra agora o diretório `Login` mude o nome do arquivo `env.example` para `.env`;
  - Em seguida, abra o arquivo `.env` e configure corretamente as variáveis de ambiente, de acordo com as suas credenciais e configurações do MySql Server e a porta para o servidor que irá rodar a API Business.


**Certifique-se de ter iniciado o `MySql Server` antes de seguir para os próximos passos. Você pode fazer isso com o seguinte comando no terminal:**

```bash
systemctl start mysql 
```

Com as variáveis de ambiente configuradas é possível rodar a aplicação de duas maneiras:

### 1- Script de instalação de dependências e execução da aplicação:

**Esta forma de execução da aplicação e instalação das dependências só funcionará se você estiver utilizando uma distribuição do Linux**

* Abra um terminal;
* Abra o projeto na raiz e verifique com o comando `ls` se o arquivo `initialize.sh` se encontra no diretório em que você está localizado;
* Se o arquivo estiver presente, basta digitar o comando `./initialize.sh`;

Ao fazer isso a aplicação rodará um script que irá iniciar a instalação de todas as dependências do projeto, irá criar as entidades no banco de dados e por fim abrirá dois terminais que irão hospedar as duas API's (`Business` e `Login`); 

### 2- Fazendo a instalação manual das dependências:

`Business`

* Abra um terminal;
* Abra o projeto no diretório `Business` e digite no terminal o comando `npm install`;
* Agora para criar as entidades as entidades digite o comando `node src/core/migrations.js`;
* Este projeto está configurado com o [Nodemon](https://www.npmjs.com/package/nodemon), desta maneira para rodar o servidor, basta digitar `npm run dev`.


`Login`

* Abra um terminal;
* Abra o projeto no diretório `Login` e digite no terminal o comando `npm install`;
* Agora para criar as entidades as entidades digite o comando `node src/core/migrations.js`;
* Este projeto está configurado com o [Nodemon](https://www.npmjs.com/package/nodemon), desta maneira para rodar o servidor, basta digitar `npm run dev`.

## Endpoints:

Na raiz do projeto encontra-se o arquivo `itau_devs_challenge_endpoints.json`, você pode importá-lo no Insomnia caso queira ter acesso a todas os endpoints de maneira mais fácil.

**Atenção: após realizar o cadastro e efetuar o login, é devolvido um `token` na resposta do login. Este `token` deve ser enviado no `header` de todas as requisições.**

### get-movie-by-title

Pesquisa um filme pelo seu título na API OMDb e retorna as informações daquele filme.

```
// GET
 localhost:4000/itau-devs/movies-review/get-movie-by-title/:title
```

retorno em caso de sucesso: 

```JSON
// 200 OK
{
	"message": "Success! Movie found, have fun!",
	"response": {
		"Title": "Undefined",
		"Year": "2006",
		"Rated": "Not Rated",
		"Released": "21 Oct 2006",
		"Runtime": "63 min",
		"Genre": "Drama",
		"Director": "Bryant Dameron, Jacob Dodd",
		"Writer": "Bryant Dameron, Jacob Dodd",
		"Actors": "Ralph Cooley, Phillip Enriquez, Gregory Labenz, Amy MacDonald",
		"Plot": "An unfortunate accident sets in motion a path of change for Nathanial Cane as he attempts to recover from substance abuse. A mentally unstable psychiatrist, DR. Henry Calhoon is tipping ...",
		"Language": "English",
		"Country": "USA",
		"Awards": "N/A",
		"Poster": "https://m.media-amazon.com/images/M/MV5BMTgzNzkxMzk5Nl5BMl5BanBnXkFtZTgwMTQ2MzA2MDE@._V1_SX300.jpg",
		"Ratings": [
			{
				"Source": "Internet Movie Database",
				"Value": "6.7/10"
			}
		],
		"Metascore": "N/A",
		"imdbRating": "6.7",
		"imdbVotes": "7",
		"imdbID": "tt1436480",
		"Type": "movie",
		"DVD": "N/A",
		"BoxOffice": "N/A",
		"Production": "N/A",
		"Website": "N/A",
		"Response": "True"
	}
}
```

retorno em caso de falha:

```JSON
// 404 
{ "message": "Movie not found!" }
```

### user-register

Realiza o cadastro de um usuário.

```
// POST
 localhost:4000/itau-devs/user/register
```

Deve-se encaminhar um body Json no seguinte formato:

```JSON
{
	"name": "Matheus",
	"email": "email@email.com",
	"password": "123456"
}
```

retorno em caso de sucesso:

```JSON
// 201 created
{
	"message": "Success! User has been registered!"
}
```

retorno em caso de falhas:

* usuário ja cadastrado:

```JSON
// 403 forbidden
{
	"message": "User already registered!"
}
```

* requisição sem campo `name`:

```JSON
// 403 forbidden
{
	"message": "Name is required!"
}
```

* requisição sem campo `email`:

```JSON
// 403 forbidden
{
	"message": "Email is required!"
}
```

* requisição sem campo `password`:

```JSON
// 403 forbidden
{
	"message": "Password is required!"
}
```

### user-login:

Realiza o Login e autenticação de um usuário.

```
// POST

 localhost:4500/itau-devs/login
```

Deve-se encaminhar um body Json no seguinte formato:

```JSON
{
	"email": "email@email.com",
	"password": "1234756"
}
```

retorno em caso de sucesso:

```JSON
// 200 OK
{
	"message": "Success! Wellcome alexandre@gemail.com",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJpdGF1LWRldnMiLCJpYXQiOjE2NTY2Mjg4NjEsImV4cCI6MTY1NjYzMjQ2MX0.fCFtqQg04A2YaN5ZXP_mbvbpJWvP0-kfKh3Z8jihuTE"
}
```

retorno em caso de falha:

```JSON
// 401 unauthorized
{
	"message": "Email or password do not exists!"
}
```

Após 3 tentativas falhas de login seguidas, o sistema bloqueará a tentativa de login com o email inserido e o retorno será:

```JSON
// 401 unauthorized
{
	"message": "Number of allowed attempts exceeded, user blocked"
}
```

### score-movie

Insere uma nota a um determinado filme

```
// POST

 localhost:4000/itau-devs/movies-review/score/:userid
```

Deve-se encaminhar um body Json no seguinte formato:

```JSON
{
	"movie": "Lala",
	"note": 5
}
```

```JSON
// 201 created

{
	"message": "Success! movie scored"
}
```

Caso de erro

```JSON
// 500 server error

{ "message": "Verify the fields and try again" }
```

### comment a movie

Insere um comentário a algum filme

```
// POST

 localhost:4000/itau-devs/movies-review/comment/:userid
```

Deve-se encaminhar um body Json no seguinte formato:

```JSON
{
	"movie": "Old",
	"comment": "doidimais"
}
```

```JSON
// 201 created
{
	"message": "Success! movie commented"
}
```

Casos de erro:

```JSON
// 201 created
{
	"message": "Movie name is required!"
}

{
	"message": "Comment name is required!"
}
```

### get-movies-infos

Retorna as informações de um filme que ja tenha sido avaliado no sistema

```
// POST

 localhost:4000/itau-devs/movies-review/get-movie-infos
```

```JSON
{
	"message": "Success! movie found",
	"movieInfos": [
		{
			"id": 1,
			"note": 5,
			"movie_name": "House",
			"user_id": 3
		}
	]
}
```

Caso nao encontre o filme:

```JSON
{
	"message": "Movie not found"
}
```

### reply-comment

Responde a um comentário

```
// POST

 localhost:4000/itau-devs/movies-review/reply-comment/:userid
```

Deve-se encaminhar um body Json no seguinte formato:

```JSON
{
	"movieCommentId": 1,
	"commentReply": "legal mesmo"
}
```

retorno em caso de sucesso:

```JSON
// 201 created
{
	"message": "Success! movie commented"
}
```

retorno em caso de falha:

```JSON
{
	"message": "movieCommentId is required!"
}

{
	"message": "commentReply is required!"
}
```

### quote-comment

Cita um comentário

```
// POST

 localhost:4000/itau-devs/movies-review/quote-comment/:userid
```

Deve-se encaminhar um body Json no seguinte formato:

```JSON
{
	"commentId": 4,
	"comment": "Ta ficando doido, é pessimo"
}
```

retorno em caso de sucesso:

```JSON
// 201 created
{
	"message": "Success! movie commented"
}
```

retorno em caso de falha:

```JSON
{
	"message": "commentId is required!"
}

{
	"message": "commentId is required!"
}
```

### like-comment

Cita um comentário

```
// POST

 localhost:4000/itau-devs/movies-review/like-comment/:userid/:commentid
```

retorno em caso de sucesso:

```JSON
// 200 created
{
	"message": "Success! comment liked!"
}
```

### comment-repeated

Marca um comentário como repetido

```
// POST

  localhost:4000/itau-devs/movies-review/comment-repeated/:userid/:commentid
```

retorno em caso de sucesso:

```JSON
// 200 created
{
	"message": "Success! comment marked as repeated!"
}
```

### delete-comment

Marca um comentário como repetido

```
// POST

  localhost:4000/itau-devs/movies-review/delete-comment/:userid/:commentid
```

retorno em caso de sucesso:

```JSON
// 200 created
{
	"message": "Success! comment deleted!"
}
```

### promote-user

Promove um usuário a moderador

```
// POST

  localhost:4000/itau-devs/user/register/promote-user/:userid/:commentid
```

retorno em caso de sucesso:

```JSON
// 200 created
{
	"message": "Success! user promoted to moderator!"
}
```

## Desenvolvedor

<a href="https://github.com/alexandremhm">**Matheus Alexandre**</a>, tem 31 anos, é pessoa desenvolvedora fullstack, de Belo Horizonte, Minas Gerais. É bacharel em Química Tecnológica pelo CEFET-MG. Além disso, estudou Desenvolvimento Web na Trybe.