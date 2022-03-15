import * as wf from "@temporalio/workflow";
import * as activities from "./activities";
import { paymentStatusChangedSignal } from "./signals/order-fulfillment.signals";

const { setOrderStatus, capturePayment, redeemPurchase, getPaymentStatus } =
  wf.proxyActivities<typeof activities>({
    startToCloseTimeout: "1 minute",
  });

export async function orderFulfillmentWorkflow(orderId: string): Promise<void> {
  await setOrderStatus(orderId, "Pending");
  await redeemPurchase(orderId);

  let paymentStatus = await getPaymentStatus(orderId);

  wf.setHandler(paymentStatusChangedSignal, async () => {
    paymentStatus = await getPaymentStatus(orderId);
  });

  if (paymentStatus === "APPROVED") {
    await capturePayment(orderId);
  }

  await wf.condition(() => paymentStatus === "CAPTURED");

  // Emit uEarn event
  // Fulfill inventory reservation
  await setOrderStatus(orderId, "Fulfilled");
}
