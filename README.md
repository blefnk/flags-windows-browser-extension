# template-browser-extension

💡 Do you need a cool starter for your next browser extension? You can use [template-browser-extension](https://github.com/blefnk/template-browser-extension)! ✅ Bun, TypeScript, ESLint v9, etc. 💻 Compatible with Mozilla Firefox and Chromium-based browsers (Google Chrome, Microsoft Edge, Opera, Vivaldi, etc.)

⭐ This project is part of the ecosystem of the [Relivator](https://github.com/blefnk/relivator) and [Reliverse](https://github.com/blefnk/reliverse) projects. 🙏 Please give a star to our projects to make them even better.

**Template Demo**: [🦊 Firefox Addons](https://addons.mozilla.org/firefox/addon/browser-extension-template) _(visit mozilla.org after installation)_

## Scripts

- To install dependencies: `bun install`
- To check/lint/format: `bun appts`
- To build: `bun run build`
- To lint: `bun lint`
- To run: `bun dev`

## 🩷 Sponsors

Thank you, everyone, for your support and for sharing this project! This project, Relivator, and Reliverse are currently sponsored by the following awesome people/organizations:

### [Patreon](https://patreon.com/blefnk), [Buy Me a Coffee](https://buymeacoffee.com/blefnk), [Ko-fi](https://ko-fi.com/blefnk)

Love using this project? If you're feeling generous, I'd appreciate a cup of coffee. You'll get Reliverse Pro, access to some private repos, pre-release downloads, and the ability to influence my project planning. Thanks!

### [Discord Server Boost](https://discord.gg/C4Z46fHKQ8)

- demir

## Roadmap

TODO: Add `bun web-ext lint` to the `bun lint` script, and `bun web-ext run` to `bun dev`. Currently, an error is thrown: `Error: Cannot find module './url'`.

TODO: Try to remove `bun` and install `pnpm`. Check if `web-ext` works with this package manager, which works natively with `nodejs` (`bun` has its own libs).

TODO: `bun addons-linter ./extension/` doesn't work as well. This command throws an error: `You did not build addons-linter yet`. Maybe because of `bun`.

## Resources

- [web-ext](https://github.com/mozilla/web-ext): A command line tool to help build, run, and test web extensions.

## Additional

This project was created using `bun init` in bun v1.1.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## FAQ

_You can find other RQs (Reliverse Questions) in the [relivator-nextjs-template](https://github.com/blefnk/relivator-nextjs-template) repo._

- **RQ21:** How do I switch the package manager from `bun` to pnpm, yarn, or npm?
  **RA21:** Here's a variant of `scripts` for `pnpm`. Scripts presets for other package managers are coming soon. Just replace it in `package.json` (and make sure nothing is missing).

  ```json
  "scripts": {
    "appts": "run-s knip lint build format typecheck",
    "build": "pnpm build ./src/index.ts --outdir ./extension/",
    "debug:eslint": "pnpm cross-env TIMING=12 eslint --fix .",
    "dev": "pnpm run src/index.ts",
    "dev:ext": "pnpm web-ext run --source-dir ./extension/",
    "dev:firefox": "pnpm run dev:ext -- --firefox=nightly",
    "format": "pnpm biome format --write .",
    "knip": "dotenv knip",
    "latest": "pnpm update --latest && pnpm add -D typescript@rc typescript-eslint@rc-v8",
    "lint": "pnpm eslint --cache --fix . && pnpm biome lint --write .",
    "lint:al": "pnpm addons-linter ./extension/",
    "lint:we": "pnpm web-ext lint",
    "reli:help": "pnpm tsx reliverse.ts --help",
    "reli:pm": "tsx reliverse.ts --pm",
    "reli:vscode": "pnpm tsx .vscode/presets/switcher.ts",
    "system": "envinfo --system --binaries --utilities",
    "typecheck": "tsc --noEmit",
    "typestat": "typestat --config typestat.json"
  }
  ```

## Project Structure

**Only a few of the files are listed here.** This section will be updated in the future versions.

- [.vscode](https://code.visualstudio.com)
  - presets
  - [extensions.json](https://code.visualstudio.com/docs/editor/extension-marketplace)
  - [settings.json](https://code.visualstudio.com/docs/getstarted/settings)
- [extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
  - assets
  - [index.js](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)
  - [manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)
- src
  - [env.ts](https://create.t3.gg/en/usage/env-variables)
  - [index.ts](https://bun.sh/docs/runtime/typescript)
- [biome.json](https://biomejs.dev/reference/configuration)
- [bun.lockb](https://bun.sh/docs/install/lockfile)
- [cspell.json](https://cspell.org/configuration)
- [eslint.config.js](https://eslint.org/docs/latest/use/configure/configuration-files)
- [knip.json](https://knip.dev/reference/configuration)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [README.md](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [reliverse.ts](https://github.com/blefnk/reliverse)
- [reset.d.ts](https://www.totaltypescript.com/ts-reset)
- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [typestat.json](https://github.com/JoshuaKGoldberg/TypeStat#readme)
