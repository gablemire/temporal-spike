export interface OrderItem {
  id: string;
  itemId: string;
  itemName: string;
}

export type PaymentStatus =
  | "APPROVED"
  | "CAPTURED"
  | "CANCELLED"
  | "DISPUTED"
  | "ERROR";

export interface Order {
  id: string;
  items: OrderItem[];
  paymentId: string;
  paymentMethod: string;

  paymentStatus: PaymentStatus;
  workflowId: string;
  fulfillmentStatus: string;

  createdAt: Date;
  updatedAt?: Date | null;
}
