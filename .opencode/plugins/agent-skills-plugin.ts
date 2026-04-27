import Path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = Path.dirname(fileURLToPath(import.meta.url));
const skillsDir = Path.resolve(__dirname, '../../skills');

export const OpencodePowerPack = async () => {
  return {
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      if (!config.skills.paths.includes(skillsDir)) {
        config.skills.paths.push(skillsDir);
      }
    },
  };
};
