/**
 * Maps a source file (praxis/...) to its destination under .claude/.
 */
export function getDestinationPath(sourceFile) {
  if (!sourceFile.startsWith("praxis/")) return null;
  return ".claude/" + sourceFile.slice("praxis/".length);
}

export function getSkillsDir() {
  return ".claude/skills/";
}

export function getDisplayName() {
  return "Claude Code";
}

/**
 * Generates .mcp.json at project root with { mcpServers: { ... } } format.
 */
export function generateMcpConfig(mcpConfig) {
  return {
    path: ".mcp.json",
    content: JSON.stringify({ mcpServers: mcpConfig }, null, 2) + "\n",
  };
}

export function getMcpConfigPath() {
  return ".mcp.json";
}
