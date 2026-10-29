import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import path from "node:path";
import fs from "node:fs";

// Ensure .env from the project root is loaded even if this module is imported directly
const packageEnv = path.resolve(import.meta.dir, "../.env");
if (!process.env.OPENROUTER_API_KEY && fs.existsSync(packageEnv) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(packageEnv);
}

export function getAgentModel() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  // Default to 'openrouter/free' if OPENROUTER_DEFAULT_MODEL is not explicitly set in .env
  const modelID = process.env.OPENROUTER_DEFAULT_MODEL || "openrouter/free";

  if (!apiKey) {
    throw new Error(
      "Missing OPENROUTER_API_KEY. Please define OPENROUTER_API_KEY in the .env file in the devagent project folder."
    );
  }

  const provider = createOpenRouter({ apiKey });
  return provider(modelID);
}
