import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, ".omniroute");
const port = process.env.PORT || "10000";

const env = {
  ...process.env,
  DATA_DIR: dataDir,
  OMNIROUTE_DATA_DIR: dataDir,
  PORT: port,
  DASHBOARD_PORT: port,
  API_PORT: port,
  OMNIROUTE_PORT: port,
  OMNIROUTE_SERVER_HOST: "0.0.0.0",
  HOSTNAME: "0.0.0.0",
  NODE_ENV: "production",
  NODE_OPTIONS: "--max-old-space-size=300",
  OMNIROUTE_MEMORY_MB: "300",
  DISABLE_ARENA_ELO_SYNC: "1",
  DISABLE_PROVIDER_STATS_SYNC: "1",
  STORAGE_ENCRYPTION_KEY: process.env.STORAGE_ENCRYPTION_KEY || "b26707cc3ad0b6868374dc304ae9ee5dd468facfe57074c1ed6fe2267bcb8b81"
};

const serverPath = path.join(__dirname, "node_modules", "omniroute", "dist", "server-ws.mjs");

console.log(`Starting OmniRoute on port ${port} with DATA_DIR=${dataDir} (memory limit 300MB)...`);

const child = spawn(process.execPath, [
  "--dns-result-order=ipv4first",
  "--max-old-space-size=300",
  serverPath
], {
  cwd: path.join(__dirname, "node_modules", "omniroute", "dist"),
  env,
  stdio: "inherit"
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
