import sizeof from "object-sizeof";
import LRU from "lru-cache";
import { cacheMaxAge, cacheSize } from "./config";

export default new LRU<string, string | undefined>({
  max: cacheSize,
  maxAge: cacheMaxAge,
  length: (value, key): number => sizeof(value) + sizeof(key)
});
