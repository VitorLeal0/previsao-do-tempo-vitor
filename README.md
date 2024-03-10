# App de teste frontend para vaga


## Como rodar o app localmente

Baixe e instale ultima versao LTS do Node.js 20.11.1
Após fazer o download deste repositorio, 

Crie na raiz do projeto um arquivo .env contendo seus tokens da [openweather](https://home.openweathermap.org/api_keys) e [google maps](https://console.cloud.google.com/google/maps-apis/) seguinto o modelo :
```
// token openweater
REACT_APP_GEO_API_KEY = sua_chave_openWeather
// token openweater
REACT_APP_GOOGLE_MAP_API_KEY = sua_chave_google
```

Após criar o arquivo, acesse o repositorio do projeto via terminar e execute os seguintes comandos.

```bash
// instalar dependencias necessárias
npm install ;

// rodar o app localmente no endereço http://localhost:3000
npm start
```
