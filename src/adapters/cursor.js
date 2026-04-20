import { transformEnvVars } from "./shared.js";

/**
 * Maps a source file (praxis/...) to its destination under .cursor/.
 */
export function getDestinationPath(sourceFile) {
  if (!sourceFile.startsWith("praxis/")) return null;
  return ".cursor/" + sourceFile.slice("praxis/".length);
}

export function getSkillsDir() {
  return ".cursor/skills/";
}

export function getDisplayName() {
  return "Cursor";
}

/**
 * Generates .cursor/mcp.json with ${env:VAR} syntax.
 */
export function generateMcpConfig(mcpConfig) {
  const transformed = transformEnvVars(
    mcpConfig,
    (_, name) => `\${env:${name}}`
  );

  return {
    path: ".cursor/mcp.json",
    content: JSON.stringify({ mcpServers: transformed }, null, 2) + "\n",
  };
}

export function getMcpConfigPath() {
  return ".cursor/mcp.json";
}
