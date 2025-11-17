import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function storage(fileName) {
  return path.join(__dirname, "..", "storage", fileName);
}
