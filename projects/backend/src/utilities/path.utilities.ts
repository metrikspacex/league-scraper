import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathFrom = (path: string, from: string): string => {
  return join(dirname(fileURLToPath(from)), path);
};

export { __dirname, __filename, pathFrom };
