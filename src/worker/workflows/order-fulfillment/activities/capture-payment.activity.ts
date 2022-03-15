import { PaymentStatus } from "../../../orders/order.model";
import { getOrder } from "../../../orders/order.repository";

export async function getPaymentStatus(
  orderId: string
): Promise<PaymentStatus> {
  const order = await getOrder(orderId);

  return order.paymentStatus;
}

export async function capturePayment(orderId: string): Promise<void> {
  const order = await getOrder(orderId);
}
