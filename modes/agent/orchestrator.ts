import { isCancel, text } from "@clack/prompts";
import { ActionTracker } from "./actiontracker";
import chalk from "chalk";
import { defaultAgentConfig } from "./types";
export async function runAgentMode() {
  console.log(chalk.bold("\n🤖 Agent Mode\n"));

  const goal = await text({
    message: "What would you like the agent to do?",
    placeholder: "Concrete task for this codebase...",
  });
  if(isCancel(goal)|| !goal.trim()) return;

  const config=defaultAgentConfig();
  const tracker=new ActionTracker();

  const executor=new ToolExecutor(tracker,config);
}