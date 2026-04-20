import { transformEnvVars } from "./shared.js";

/**
 * Maps a source file (praxis/...) to its destination under .opencode/.
 */
export function getDestinationPath(sourceFile) {
  if (!sourceFile.startsWith("praxis/")) return null;
  return ".opencode/" + sourceFile.slice("praxis/".length);
}

export function getSkillsDir() {
  return ".opencode/skills/";
}

export function getDisplayName() {
  return "OpenCode";
}

/**
 * Generates opencode.json with mcp key, {env:VAR} syntax, type: "local".
 */
export function generateMcpConfig(mcpConfig) {
  const servers = {};

  for (const [name, entry] of Object.entries(mcpConfig)) {
    const command = [entry.command, ...(entry.args || [])];
    const env = entry.env || {};
    const environment = transformEnvVars(
      env,
      (_, varName) => `{env:${varName}}`
    );

    servers[name] = {
      type: "local",
      command,
      environment,
    };
  }

  return {
    path: "opencode.json",
    content: JSON.stringify({ mcp: servers }, null, 2) + "\n",
    mergeKey: "mcp",
  };
}

export function getMcpConfigPath() {
  return "opencode.json";
}
