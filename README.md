# my-movie-db [ Frontend ]

This is the vue.js Frontend for [my-movie-db](http://kael.kaus.uberspace.de/my-movie-db/app/).

## Setup

### Install Dependencies

    npm install

### Run Development Server

    npm run dev

### Build For Production

    npm run build-local
    npm run build-server

You can define on which URIs you want to access your API when deploying on a server or building locally.  
To do so, change `API_URI` in *webpack.config.js*.

```js
// webpack.config.js
...
module.exports.plugins = [
  new webpack.DefinePlugin({
    API_URI: "'localhost:61008/'"
  })
]
...
```
