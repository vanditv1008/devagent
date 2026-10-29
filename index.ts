#!/usr/bin/env bun

import path from "node:path";
import fs from "node:fs";

// Always load .env from the devagent installation directory so the CLI works from any folder on the system
const packageEnv = path.resolve(import.meta.dir, ".env");
if (fs.existsSync(packageEnv) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(packageEnv);
}

import { Command } from "commander";
import { runWakeup } from "./tui/wakeup";
const program=new Command();
program.name("devagent").description("devagent cli ").version("0.0.1");

program.command("wakeup").description("Show the banner and pick cli or telegram mode").action(async ()=>{
    await runWakeup();
});

await program.parseAsync(process.argv);
