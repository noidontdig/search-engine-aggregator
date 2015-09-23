# Search Engine Aggregator

Your task is to build a search engine aggregator that, for a given query, returns combined results from Google, Yahoo, and Bing (or any other search engine you prefer as long as there are 3 of them). Java or Node are strongly preferred, but Python/Ruby/Go are also acceptable. This aggregator should be considered an API and provide a RESTful interface that emits JSON responses (i.e. it should be possible to query it from a terminal using `curl`).

To run:

```
$ npm install
$ node app.js
```

To request search results:

```
$ curl 0.0.0.0:3000/YOUR_SEARCH_QUERY
```
