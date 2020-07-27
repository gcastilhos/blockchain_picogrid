# blockchain_picogrid_11

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Additional Modules

* axios
* bootstrap
* express
* jest (for testing)
* node-fetch
* sha256
* vue-router
* vuex

## Events Server For Testing

The environment variables are set in `.env.local` for development. The `.env` file follows this convention for each environemnt

```
.env.local # local environment
.env.development # blockchainpicogrid11-dev
.env.staging # blockchainpicogrid11-stage
.env.production # blockchainpicogrid11
```

These variables are set locally

```
VUE_APP_DELAY=1000 # Delay between calls to local server
VUE_APP_MAX_BATCH=10 # Number of requests before running the block creation algorithm (hash)
VUE_APP_HEADERS='{"Access-Control-Allow-Origin": "http://localhost:5000/"}' # Header to use CORS (see below)
VUE_APP_DATA_API_URI=http://localhost:5000/events # Local server (event queue)
```

### Setting CORS

