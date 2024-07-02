"use server";

import fs from "fs/promises";

export async function readVersion() {
    const version = await fs.readFile("version.config", { encoding: "utf8" });
    return version;
}

