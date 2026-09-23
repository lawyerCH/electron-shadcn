import { defineConfig, type Plugin, type UserConfig } from "vite";

/**
 * @electron-forge/plugin-vite still sets the deprecated rollup
 * `inlineDynamicImports` option. Rolldown wants `codeSplitting: false` instead,
 * and warns if the old key is present at all — so replace it after merge.
 */
function codeSplittingFlagPlugin(): Plugin {
  return {
    config(config: UserConfig) {
      const output = config.build?.rollupOptions?.output;
      if (output && !Array.isArray(output)) {
        output.inlineDynamicImports = undefined;
        output.codeSplitting = false;
      }
    },
    name: "code-splitting-flag",
  };
}

export default defineConfig({
  plugins: [codeSplittingFlagPlugin()],
});
