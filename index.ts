import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { FluxDispatcher } from "@webpack/common";

const APPLICATION_ID = "1384990286253391932";
const POLL_INTERVAL = 15_000;

const settings = definePluginSettings({
    showPlaceName: {
        type: OptionType.BOOLEAN,
        description: "Show the current place name in your Rich Presence",
        default: true,
        onChange() {
            setActivity(isActive, lastPlaceName, true);
        },
    },
});

let pollTimer: ReturnType<typeof setInterval> | null = null;
let isActive = false;
let startTimestamp = 0;
let lastPlaceName: string | null = null;

function setActivity(active: boolean, placeName: string | null, force = false) {
    if (!force && active === isActive && placeName === lastPlaceName) return;

    if (active && !isActive) startTimestamp = Date.now();
    isActive = active;
    lastPlaceName = placeName;

    const showName = settings.store.showPlaceName;

    FluxDispatcher.dispatch({
        type: "LOCAL_ACTIVITY_UPDATE",
        activity: active
            ? {
                application_id: APPLICATION_ID,
                name: "Roblox Studio",
                type: 0,
                details: showName ? (placeName ? `Editing ${placeName}` : undefined) : undefined,
                timestamps: { start: startTimestamp },
                flags: 1 << 0,
            }
            : null,
        socketId: "RobloxStudioRPC",
    });
}

async function poll() {
    const status = await VencordNative.pluginHelpers.RobloxStudioRPC.getStudioStatus();
    setActivity(status.running, status.placeName);
}

export default definePlugin({
    name: "RobloxStudioRPC",
    description: "Shows a Discord Rich Presence status automatically whenever Roblox Studio is open",
    authors: [],
    settings,
    requiresRestart: false,

    start() {
        poll();
        pollTimer = setInterval(poll, POLL_INTERVAL);
    },

    stop() {
        if (pollTimer) clearInterval(pollTimer);
        pollTimer = null;
        setActivity(false, null);
    },
});
