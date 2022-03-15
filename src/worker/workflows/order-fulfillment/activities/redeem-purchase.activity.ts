import { getOrder } from "../../../orders/order.repository";
import { redeemOrder } from "../../../orders/order.service";

export async function redeemPurchase(orderId: string): Promise<void> {
  console.log(`Redeeming purchase for order ${orderId}`);

  const order = await getOrder(orderId);
  await redeemOrder(order);

  console.log(`Purchase redeemed for order ${orderId}`);
}
