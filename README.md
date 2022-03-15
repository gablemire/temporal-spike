# Temporal Checkout flow - Spike

## How to use

1. Run `npm install`
2. Run `docker-compose up -d` to launch Temporal
3. Run `npm run dev` to launch the Workflow worker
4. Run `npm run start:client` to create an Order to fulfill
5. Once the Workflow is waitiing for the Payment Captured event, run `npm run start:paymenthook <orderId>` (where `<orderId>` is the ID of the order).

## How to view the Temporal UI

Visit `http://localhost:8088`
