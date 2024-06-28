// Please visit the Scripts section in README.md file to learn more about sccript
// Or just run `pnpm reli:vscode` from the root folder to run the switcher script

import { config } from "@reliverse/core";
import consola from "consola";
import { copyFileSync, existsSync, readdirSync } from "node:fs";
// eslint-disable-next-line unicorn/import-style
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import task from "tasuku";

// Define __dirname for ES module context
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define paths
const projectRoot = join(__dirname, "../..");
const vscodeDirectory = join(projectRoot, ".vscode");
const presetsDirectory = join(vscodeDirectory, "presets");

const presets = ["default", "medium", "ultimate"];

// Function to copy files
// eslint-disable-next-line @typescript-eslint/require-await
async function copyFiles(sourceDirectory: string, targetDirectory: string) {
  if (!existsSync(sourceDirectory)) {
    throw new Error(`Source directory does not exist: ${sourceDirectory}`);
  }

  for (const file of readdirSync(sourceDirectory)) {
    const sourceFile = join(sourceDirectory, file);
    const targetFile = join(targetDirectory, file);

    copyFileSync(sourceFile, targetFile);
  }
}

// Main function to switch presets
async function switchPreset(preset: string) {
  if (!presets.includes(preset)) {
    consola.fail(`Invalid preset: ${preset}`);
    consola.info(`Available presets: ${presets.join(", ")}`);

    return;
  }

  const presetDirectory = join(presetsDirectory, preset);

  await task(`Switching to ${preset} preset`, async ({ setTitle }) => {
    await copyFiles(presetDirectory, vscodeDirectory);

    setTitle(`[${config.engine.name}] Switched to ${preset} VSCode preset`);
  });
}

// Use consola.prompt for confirmation
async function promptConfirmation(message: string): Promise<boolean> {
  return await consola.prompt(message, { type: "confirm" });
}

// Get preset from command line arguments
const preset = process.argv[2];

if (preset) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
  (async () => {
    const confirm = await promptConfirmation(
      "‼️ This will overwrite extensions.json, launch.json, and settings.json. Do you want to continue?",
    );

    if (confirm) {
      switchPreset(preset).catch((error) => {
        // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-floating-promises
        task("Error", async ({ setTitle }) => {
          setTitle(error.message);

          throw error;
        });
      });
    } else {
      consola.info("Operation cancelled by the user.");
    }
  })();
} else {
  consola.fail("Please provide a preset name as an argument");
  consola.info(`Available presets: ${presets.join(", ")}`);
}
