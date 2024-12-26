# Support for New Features in the Yandex.Games SDK 

Typically, when maintaining this repository, most tasks involve adding support for new functionality from the Yandex.Games SDK.

This is easy to do, and you won’t even need to open Cocos Creator. Here’s what you need to do:

1. Update the `@types/ysdk` dependency. Simply run `npm install @types/ysdk@latest`.

2. Reflect the SDK changes in the `CHANGELOG.md` file.

3. Update the plugin version in `package.json`.

4. Run the script `npm run bundle` to generate two archives in the `bundles` folder.

5. From the `bundles` folder:
   - Publish the archive named `ysdk-cc-[version].zip` on GitHub.
   - Publish the archive named `ysdk.zip` on the Cocos Store.

It may seem like a slightly lengthy process, but trust me, you’ll thank me later.

# Modifying Extension Functionality

Sometimes, updating the TypeScript package isn’t enough, and you’ll need to make changes within the extension.

First, refer to the official [Cocos Creator Extension Documentation](https://docs.cocos.com/creator/3.8/manual/en/editor/extension/readme.html).

This monorepo serves as an extension for Cocos Creator. I mean the entire repository as a whole. To start development, open the Extension Manager, click `Install Extension Folder`, and select the directory where the repository is located.

This repository consists of three main parts:

- `workspaces/static`: Files available while working in the Cocos Creator editor.
  - `workspaces/static/assets`: Files visible to users of the extension in the Assets tab of the editor.

- `workspaces/electron-main`: Scripts that can extend the functionality of the Cocos Creator engine. [Learn more](https://docs.cocos.com/creator/3.8/manual/en/editor/extension/contributions.html).
  - `main`: The entry point for the extension. Here, you can declare methods callable by other engine processes.
  - `builder`: Extends the project build functionality within the engine.
  - `panels`: Adds new interfaces to the engine.
  - `server`: Undocumented functionality of Cocos Creator. It’s required only for interaction with [`Preview in Browser`](https://docs.cocos.com/creator/3.8/manual/en/editor/preview/).

- `workspaces/common`: Code that can be reused in scripts from `electron-main` and `static/assets`.
