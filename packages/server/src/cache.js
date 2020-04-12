const sizeof = require("object-sizeof");
const LRU = require("lru-cache");
const { cacheSize, cacheMaxAge } = require("./config");

module.exports = new LRU({
  max: cacheSize,
  maxAge: cacheMaxAge,
  length: (value, key) => sizeof(value) + sizeof(key)
});
