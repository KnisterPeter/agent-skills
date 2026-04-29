// @ts-check
import Path from "node:path";
import Fs from "node:fs/promises";

/**
 * @typedef {import("@opencode-ai/plugin").Plugin} Plugin
 * @typedef {import("@opencode-ai/plugin").Config} Config
 * @typedef {Config & { skills?: { paths?: string[] } }} ConfigWithSkills
 */

/**
 * @type {Plugin}
 */
export const OpencodeAgentSkills = async () => {
  const skillsDir = Path.resolve(import.meta.dirname, "../../skills");
  const promptPatch = await Fs.readFile(
    Path.resolve(import.meta.dirname, "../prompt-patch.md"),
    "utf8",
  );

  return {
    /**
     * @param {ConfigWithSkills} config
     */
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      if (!config.skills.paths.includes(skillsDir)) {
        config.skills.paths.push(skillsDir);
      }
    },
    "experimental.chat.system.transform": async (input, output) => {
      output.system.push(promptPatch);
    },
  };
};
