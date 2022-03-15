import { Connection, WorkflowClient } from "@temporalio/client";
import {
  bootstrapDB,
  getOrder,
  saveOrder,
} from "../worker/orders/order.repository";
import { paymentStatusChangedSignal } from "../worker/workflows/order-fulfillment/signals/order-fulfillment.signals";

async function main(orderId: string) {
  bootstrapDB();

  const order = await getOrder(orderId);
  order.paymentStatus = "CAPTURED";
  await saveOrder(order);

  const connection = new Connection();
  const client = new WorkflowClient(connection.service);

  const wfHandle = client.getHandle(order.workflowId);
  await wfHandle.signal(paymentStatusChangedSignal);
}

main(process.argv[2]).catch((err) => {
  console.error(err);
  process.exit(1);
});
