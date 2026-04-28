import Path from "node:path";
import { fileURLToPath } from "node:url";
import Fs from "node:fs/promises";

const __dirname = Path.dirname(fileURLToPath(import.meta.url));
const skillsDir = Path.resolve(__dirname, "../../skills");

export const OpencodePowerPack = async () => {
  const promptPatch = await Fs.readFile(
    Path.resolve(__dirname, "../prompt-patch.md"),
    "utf8",
  );

  return {
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
