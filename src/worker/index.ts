import * as path from "node:path";
import { Worker } from "@temporalio/worker";
import * as welcomeActivities from "./workflows/welcome/activities";
import * as orderFulfillmentActivities from "./workflows/order-fulfillment/activities";
import { bootstrapTemporalClient } from "./temporal-client";

async function main(): Promise<void> {
  bootstrapTemporalClient();

  const worker = await Worker.create({
    workflowsPath: path.resolve(__dirname, "workflows"),
    debugMode: true,
    taskQueue: "temporal-example",
    activities: {
      ...welcomeActivities,
      ...orderFulfillmentActivities,
    },
  });

  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
