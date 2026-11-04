# RobloxStudioRPC

A Vencord plugin that gives you Discord rich presence for Roblox Studio while it's open.

## Features

- Displays Roblox Studio presence when it's open, and optionally the place name you're editing.

## How It Works

1. Every 15 seconds, the plugin checks whether `RobloxStudioBeta.exe` is running.
2. If Roblox Studio is running, the plugin reads the window title and strips the place name from it (by default the title is `PLACENAME - Roblox Studio`).
3. The status is set in Discord using an application ID with the same name and icon as Roblox Studio (found in `index.ts`).

## Installation

### Auto Install (Recommended)

1. Download the installer script from the releases and place it somewhere you will keep Vencord.
2. Run it. The first run might take a few minutes.
3. Wait until you are prompted to choose which Discord version to patch. If you don't know, just press Enter.

Discord will then close if it was open, and you're done.

Go to your plugins, click "Show All" in the filters section, and choose "Show Userplugins". You'll find the plugin there.

Run the same script to receive an update if the plugin is ever updated.

Don't move or delete the created folder.

### Manual Install

1. Choose where you want Vencord to be and open a command prompt there.
2. Install the needed tools:

```text
winget install --id Git.Git -e --source winget
winget install --id OpenJS.NodeJS.LTS -e --source winget
```

3. Restart the command prompt.
4. Install one more needed tool:

```text
npm install -g pnpm
```

5. Run the following commands in order:

```text
mkdir VencordBuild
cd VencordBuild
git clone https://github.com/Vendicated/Vencord.git
cd Vencord
pnpm install
mkdir src\userplugins\
cd src\userplugins\
git clone https://github.com/z6gg/RobloxStudioRPC.git
cd ../..
pnpm build && pnpm inject
```

6. You will reach a point where it prompts you for which Discord version to patch. Choose the one you want.
7. Discord will close if it was open. Open it back up, go to your plugins, click "Show All" in the filters, and choose "Show Userplugins". You'll find the plugin there.

Don't move or delete the created folder.

If the plugin is ever updated, `cd` into `src\userplugins\RobloxStudioRPC` and run:

```text
git pull
cd ../../..
pnpm build && pnpm inject
```

---

*Human directed, made with Claude Sonnet 5.*
