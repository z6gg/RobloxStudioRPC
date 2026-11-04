# RobloxStudioRPC

vencord plugin that gives you rich presence for roblox studio (when it's open)

## Features

- displays roblox studio presence when it's open, and optionally the place name you're editing

## How it works
1. every 15 seconds, the plugin checks if RobloxStudioBeta.exe is open
2. if roblox studio is running, the plugin reads the window name and strips the place name from it (by default it's PLACENAME - Roblox Studio)
3. status is set in discord using an application id with the same name and icon as roblox studio (found in index.ts)

## Installation
### Auto Install (Recommended)
1. download the installer script in the releases, place it somewhere you will keep vencord in
2. run it, the first run might take a few minutes,
3. wait until you get prompted to choose which discord version you wanna patch, if you don't know just click enter

discord will then close if it was open, and you're done

go to your plugins then click "Show All" in the filters section and choose "Show Userplugins" where you'll find the plugin

run the same script to receive an update if the plugin ever gets updated

don't move or delete the created folder

### Manual Install
1. choose where you want vencord to be and run a command prompt there
2. install needed tools:
```
winget install --id Git.Git -e --source winget
winget install --id OpenJS.NodeJS.LTS -e --source winget
```
3. restart cmd
4. install another needed tool:
```
npm install -g pnpm
```
5. run the following commands in order:
```
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
6. you will reach a point where it prompts you which discord version you wanna patch, choose your desired one
7. discord will close if it was open, open it back up and go to your plugins then click "Show All" in the filters and choose "Show Userplugins" where you'll find the plugin

don't move or delete the created folder

if the plugin ever gets updated, cd into your `src\userplugins\RobloxStudioRPC` and repeat the following commands:
```
git pull
cd ../../..
pnpm build && pnpm inject
```

---

*Human directed, made with Claude Sonnet 5.*