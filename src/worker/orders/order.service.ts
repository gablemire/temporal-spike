import { SECONDS, sleep } from "../../utils/sleep";
import { getTemporalClient } from "../temporal-client";
import { paymentStatusChangedSignal } from "../workflows/order-fulfillment/signals/order-fulfillment.signals";
import { Order } from "./order.model";
import { getOrder, saveOrder } from "./order.repository";

const wolfDB: Record<string, number> = {};

export async function redeemOrder(order: Order): Promise<void> {
  const tries = wolfDB[order.id] ?? 0;
  const currentTry = tries + 1;
  wolfDB[order.id] = currentTry;

  await sleep(5 * SECONDS);

  if (currentTry < 3) {
    throw new Error("Flaky API");
  }
}

export async function captureOrderPayment(order: Order): Promise<Order> {
  const { paymentId } = order;

  await sleep(5 * SECONDS);
  console.log(`Captured Payment "${paymentId}" for order ${order.id}`);

  return order;
}
