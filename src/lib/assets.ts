import { existsSync } from "node:fs";
import path from "node:path";

export function hasPublicFile(filename: string): boolean {
  return existsSync(path.join(process.cwd(), "public", filename));
}
