import { proxyActivities } from "@temporalio/workflow";
import * as activities from "./activities";

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
});

export async function welcome(name: string): Promise<string> {
  return await greet(name);
}
