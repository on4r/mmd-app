my-movie-db [ Frontend ]
=======================

This is the vue.js Frontend for [my-movie-db](http://kael.kaus.uberspace.de/my-movie-db/app/).

Setup
-----

**Environment Variables**
The server expectes a `.env` file in the root directory ([env2](https://github.com/dwyl/env2)).

    PORT=xxxx
    TMDB_API_KEY=xxxx

>Get you API-Key from [themoviedb.org](https://www.themoviedb.org/documentation/api)

**Install Dependencies**

    npm install

**Build**

    npm run build

**Start Server**

    node app-server.js
