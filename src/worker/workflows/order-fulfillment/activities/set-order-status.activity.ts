import { getOrder, saveOrder } from "../../../orders/order.repository";

export async function setOrderStatus(
  orderId: string,
  newStatus: string
): Promise<void> {
  const order = await getOrder(orderId);

  order.fulfillmentStatus = newStatus;
  await saveOrder(order);

  console.log(`Order ${orderId} set to "In Progress"`);
}
