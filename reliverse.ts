/* eslint-disable unicorn/no-process-exit */

import { config } from "@reliverse/core";
import { Command } from "commander";
import consola from "consola";
import semver from "semver";

import { env } from "~/env";

// TODO: Move technical stuff to the "@reliverse/core" package

export const bootstrappedFrameworkVersion = "1.2.6";

export const bootstrappedGeneratorVersion = "0.4.0";

// [1.3.0] The project is currently using the 'bun' package manager. If you
// want to use a different one, set it here and run 'bun reli:pm <manager>'.
export const projectPackageManager = "bun" as "bun" | "npm" | "pnpm" | "yarn";

// Create a new Commander.js instance
const program = new Command();

program
  .version(`${bootstrappedFrameworkVersion}`)
  .option("--help", "display help for command")
  .option(
    "--pm <manager>",
    "switch package manager",
    `${projectPackageManager}`,
  )
  .action((options) => {
    if (options.help) {
      const frameworkInfoParts = [
        `▲ Framework: ${config.framework.name} v${bootstrappedFrameworkVersion}`,
        `▲ Engine: ${config.engine.name} v${bootstrappedGeneratorVersion}`,
        `▲ Hotline: ${config.social.discord}`,
      ];
      const frameworkInfo = frameworkInfoParts.join(" ");
      const supportUsInfo =
        "`Help Relivator become even better; Please! Star the repo – https://github.com/blefnk/relivator`";

      consola.info(frameworkInfo);
      consola.info(supportUsInfo);

      if (env.NODE_ENV === "development") {
        const updateInfo =
          "For experienced users: run 'pnpm latest' to update all dependencies to the latest versions";

        const qualityStandardsInfo =
          "Meet quality standards: run 'pnpm appts' to get linting, formatting, codebase health check, etc.";

        const turboBuildInfo =
          "Unstable: try 'pnpm dev:turbo' & faster build with 'pnpm build:turbo'; https://turbo.build/repo";

        consola.info(updateInfo);
        consola.info(qualityStandardsInfo);
        consola.info(turboBuildInfo);

        if (semver.gt(config.framework.version, bootstrappedFrameworkVersion)) {
          const newVersionInfoParts = [
            `🟢 A new ${config.framework.name} ${config.framework.version} version is available!`,
            `The current version is ${bootstrappedFrameworkVersion}.`,
            `Download: ${config.framework.repo}/releases/tag/${config.framework.version}`,
          ];
          const newVersionInfo = newVersionInfoParts.join(" ");

          consola.warn(newVersionInfo);
        }

        if (semver.lt(config.framework.version, bootstrappedFrameworkVersion)) {
          const oldVersionInfoParts = [
            `🟡 The ${config.framework.name} version (${config.framework.version}) is older`,
            `than the bootstrapped version (${bootstrappedFrameworkVersion}).`,
            "This might lead to unexpected behavior.",
          ];
          const oldVersionInfo = oldVersionInfoParts.join(" ");

          consola.warn(oldVersionInfo);
        }
      }

      if (config.framework.version === bootstrappedFrameworkVersion) {
        const releaseInfo =
          "[Relivator v1.2.6 Release Blog Post] 👉 https://docs.bleverse.com/en/blog/relivator/v126";

        consola.info(releaseInfo);
      }

      process.exit(0);
    }

    if (options.pm) {
      const pmInfoParts = [
        "Please find `Q21` in the FAQ of README.md.",
        "Copy the adapted bun scripts and replace the current ones in",
        "package.json (scripts for other package managers coming soon).",
      ];
      const pmInfo = pmInfoParts.join(" ");

      consola.info(pmInfo);
      process.exit(0);
    }

    process.exit(0);
  });

program.parse(process.argv);

// Display help if no arguments are provided
if (process.argv.length === 2) {
  program.help();
}
