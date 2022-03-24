import { Connection, WorkflowClient } from "@temporalio/client";
import { v4 as uuidV4 } from "uuid";
import { Order } from "../worker/orders/order.model";
import { bootstrapDB, saveOrder } from "../worker/orders/order.repository";
import { orderFulfillmentWorkflow } from "../worker/workflows";

async function main(): Promise<void> {
  bootstrapDB();

  const connection = new Connection();

  const client = new WorkflowClient(connection.service);

  const order: Order = {
    id: uuidV4(),
    fulfillmentStatus: "CREATED",
    paymentId: uuidV4(),
    paymentMethod: "mock",
    paymentStatus: "APPROVED",
    items: [
      {
        id: uuidV4(),
        itemId: "1",
        itemName: "Super Skin",
      },
    ],
    workflowId: uuidV4(),
    createdAt: new Date(),
    updatedAt: null,
  };

  await saveOrder(order);

  console.log(`Order ${order.id} created`, order);

  await client.start(orderFulfillmentWorkflow, {
    args: [order.id],
    taskQueue: "temporal-example",
    workflowId: order.workflowId,
  });

  console.log(`Scheduled fulfillment workflow for Order ${order.id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
