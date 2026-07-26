import { exec } from "child_process";

function run(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(cmd, { windowsHide: true }, (err, stdout) => {
            if (err) return reject(err);
            resolve(stdout);
        });
    });
}

export interface StudioStatus {
    running: boolean;
    placeName: string | null;
}

function extractPlaceName(title: string): string | null {
    const cleaned = title
        .replace(/\s*-\s*Roblox Studio\s*$/i, "")
        .replace(/\s*-\s*Studio\s*$/i, "")
        .trim();
    return cleaned.length > 0 ? cleaned : null;
}

async function getWindowsStatus(): Promise<StudioStatus> {
    const out = await run(
        'tasklist /FI "IMAGENAME eq RobloxStudioBeta.exe"'
    );
    const running = out.toLowerCase().includes("robloxstudiobeta.exe");
    if (!running) return { running: false, placeName: null };

    try {
        const titleOut = await run(
            'powershell -NoProfile -Command "(Get-Process -Name RobloxStudioBeta -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle } | Select-Object -First 1 -ExpandProperty MainWindowTitle)"'
        );
        const title = titleOut.trim();
        return { running: true, placeName: title ? extractPlaceName(title) : null };
    } catch {
        return { running: true, placeName: null };
    }
}

async function getUnixStatus(processNameCmd: string): Promise<StudioStatus> {
    const out = await run(processNameCmd);
    const running = out.toLowerCase().includes("robloxstudio");
    return { running, placeName: null };
}

export async function getStudioStatus(): Promise<StudioStatus> {
    try {
        if (process.platform === "win32") return await getWindowsStatus();
        if (process.platform === "darwin") return await getUnixStatus("ps -ax -o comm=");
        return await getUnixStatus("ps -A -o comm=");
    } catch {
        return { running: false, placeName: null };
    }
}
