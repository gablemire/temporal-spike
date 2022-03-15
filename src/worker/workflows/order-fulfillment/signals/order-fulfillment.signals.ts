import * as wf from "@temporalio/workflow";

export const paymentStatusChangedSignal = wf.defineSignal(
  "payment_status_changed"
);
