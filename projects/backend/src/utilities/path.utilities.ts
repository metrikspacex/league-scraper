import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// TODO: Singleton
const pathFrom = (path: string, from: string): string => {
  return join(dirname(fileURLToPath(from)), path);
};
export { pathFrom };
