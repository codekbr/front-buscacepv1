# front-buscacep Vue 3 

Obs: Certifique estar rodando tanto o back-end laravel para que ele consuma a API.
Segue o link do projeto laravel -> https://github.com/codekbr/buscaCepv1

## Instalar todas dependências do projeto.
```
npm install
```

## Arquivo .env

```
no projeto crie um arquivo chamado .env e adicione as seguintes linhas.
VUE_APP_ROOT_API=http://localhost:8000 // Esse será a baseURL do endpoint da api, para as requisições no laravel.
```

### Compile e aguarde
```
npm run serve
Após basta acessar a url definida com a porta geralmente é http://localhost:8080
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
