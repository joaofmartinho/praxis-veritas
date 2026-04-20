const DISPLAY_NAME = "Amp Code";

/**
 * Maps a source file (praxis/...) to its destination under .agents/.
 * Amp Code uses .agents/ as its native directory.
 */
export function getDestinationPath(sourceFile) {
  if (!sourceFile.startsWith("praxis/")) return null;
  return ".agents/" + sourceFile.slice("praxis/".length);
}

export function getSkillsDir() {
  return ".agents/skills/";
}

export function getDisplayName() {
  return DISPLAY_NAME;
}

/**
 * Amp Code reads per-skill mcp.json files directly — no generation needed.
 */
export function generateMcpConfig() {
  return null;
}

export function getMcpConfigPath() {
  return null;
}
