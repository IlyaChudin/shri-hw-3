import sizeof from "object-sizeof";
import LRU from "lru-cache";
import config from "./config";

export default new LRU<string, string | undefined>({
  max: config.cacheSize,
  maxAge: config.cacheMaxAge,
  length: (value, key): number => sizeof(value) + sizeof(key)
});
