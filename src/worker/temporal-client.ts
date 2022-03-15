import { WorkflowClient, Connection } from "@temporalio/client";

let client: WorkflowClient | undefined = undefined;

export function getTemporalClient(): WorkflowClient {
  if (!client) {
    throw new Error("Workflow client was not bootstrapped");
  }

  return client;
}

export function bootstrapTemporalClient(): WorkflowClient {
  const connection = new Connection();
  client = new WorkflowClient(connection.service);

  return client;
}
