# Be The Hero
Aplicação Be The Hero, desenvolvida durante a **Semana OmniStack 11.0** da [Rocketseat](https://rocketseat.com.br/). A aplicação consiste no cadastro de ONGs e casos cadastrados por elas, para que as pessoas possam ajudar a resolvê-los através de um financiamento.

Para clonar o repositório, execute o seguinte comando no terminal:

```
git clone https://github.com/fernandogatto/be-the-hero.git
```

## Instalação
Pré-requisitos:
git, node, express, knex, sqlite, react, react-native, expo.

### Backend
Construído com *NodeJS*, banco de dados *sqlite*.

Para iniciar o servidor execute os comandos no terminal:
```
cd backend
npm install
npm start
```

### Frontend
Construído com *ReactJS* e *Knex* fazendo a integração com o banco de dados.

Para iniciar o servidor execute os comandos no terminal:
```
cd frontend
npm install
npm start
```
É possível executar os servidores do backend e do frontend juntos. Assim será possível ver as consultas do banco de dados pelo frontend do projeto.

Ao iniciar o servidor, abra o navegador no endereço ```http://localhost:3000```.

### Mobile
Construído com ReactNative, *Knex* fazendo a integração com o banco de dados e *Expo*, que permite o acesso às API’s nativas do dispositivo sem precisar instalar as dependências no projeto.

É preciso ter instalado no seu dispositivo móvel o aplicativo Expo, que pode ser encontrado na loja virtual do aparelho. Além disso, no arquivo **api.js**, encontrado no diretório ```mobile/src/services/api.js```, troque o endereço IP para o da sua máquina.

Para iniciar o servidor execute os comandos no terminal:
```
cd mobile
npm install
yarn install
yarn start
```
É possível executar os servidores do backend e do mobile juntos. Assim será possível ver as consultas do banco de dados pelo frontend do projeto.

Ao rodar o servidor, abra o navegador no endereço ```http://localhost:19002```. Aparecerá um código QR nessa tela. Esperece aparecer a mensagem *Tunnel Ready*, então, com o aplicativo aberto no seu celular, aponte a câmera para esse código. Será feito o escaneamento. Após o reconhecimento, iniciará o carregamento do JavaScript. Se não funcionar com o Tunnel, tente com LAN.

## Projeto

### Web ###

Login com possível ID: **ac3662ea**.

![](/assets/logon.png)

![](/assets/casos-cadastrados.png)

### Mobile ###

![](/assets/splash.png)
